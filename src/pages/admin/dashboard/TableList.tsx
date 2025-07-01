import ConfirmationModal from "@/components/ConfirmationModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteComplaint } from "@/services/complaints/mutations/soft-delete-complaints";
import { Complaint } from "@/types/complaint";
import { useState } from "react";
import { toast } from "sonner";

// Import komponen modal foto yang akan kita buat
import PhotoModal from "@/components/modals/PhotoModal";

export default function TableList({
  complaint,
  idx,
  onEdit,
  setSelectedComplaintId,
}: {
  complaint: Complaint;
  idx: number;
  onEdit: () => void;
  setSelectedComplaintId: (complaintId: number) => void;
}) {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState("");

  const { mutate } = useDeleteComplaint();

  const HandleDelete = () => {
    mutate(complaint.id.toString(), {
      onSuccess: () => {
        toast.success("Complaint successfully deleted!");
      },
      onError: () => {
        toast.error("Failed to delete complaint. Please try again!");
      },
    });
  };

  const openPhotoModal = (photoUrl: string) => {
    setCurrentPhotoUrl(photoUrl);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setCurrentPhotoUrl("");
  };

  // --- Fungsi helper baru untuk memformat deskripsi ---
  const formatDescription = (description: string, maxLength: number = 50) => {
    if (!description) return null;

    const lines: JSX.Element[] = [];
    let currentText = description;

    while (currentText.length > 0) {
      // Jika panjang sisa teks lebih dari maxLength, ambil potongan
      if (currentText.length > maxLength) {
        let segment = currentText.substring(0, maxLength);
        // Cek apakah karakter ke-maxLength adalah spasi, atau cari spasi terakhir sebelum maxLength
        // Ini untuk menghindari pemotongan kata di tengah
        const lastSpaceIndex = segment.lastIndexOf(' ');
        if (lastSpaceIndex !== -1 && lastSpaceIndex > maxLength - 10) { // Menghindari terlalu pendek jika spasi jauh di depan
          segment = segment.substring(0, lastSpaceIndex);
        }
        lines.push(<span key={lines.length}>{segment}</span>);
        lines.push(<br key={`br-${lines.length}`} />); // Tambahkan baris baru
        currentText = currentText.substring(segment.length).trimStart(); // Hapus potongan yang sudah diambil dan spasi di awal
      } else {
        // Jika sisa teks kurang dari atau sama dengan maxLength, ambil semua
        lines.push(<span key={lines.length}>{currentText}</span>);
        currentText = ""; // Selesai
      }
    }
    return lines;
  };
  // --- Akhir fungsi helper baru ---

  return (
    <>
      <TableRow className=" text-xs md:text-sm">
        <TableCell className="font-medium w-[100-px]">{idx}</TableCell>
        <TableCell className="w-[100px]">{complaint.name}</TableCell>
        <TableCell className="w-[100px]">
          <div className="flex flex-col">
            <span className="font-medium">{complaint.location}</span>
            <span className="text-xs text-gray-500 mt-1">
              {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </TableCell>
        {/* --- Gunakan fungsi formatDescription di sini --- */}
        <TableCell className="w-[100px] text-xs">
          {formatDescription(complaint.description, 50)}
        </TableCell>
        {/* --- Akhir penggunaan fungsi formatDescription --- */}
        <TableCell className="w-[100px]">
          {complaint.photo ? (
            <img
              src={complaint.photo}
              alt="Complaint photo"
              className="w-16 h-16 object-cover rounded cursor-pointer"
              onClick={() => openPhotoModal(complaint.photo as string)}
            />
          ) : (
            <span className="text-gray-500">No photo</span>
          )}
        </TableCell>
        <TableCell
          className={`w-[100px]  font-semibold uppercase ${
            complaint.status == false ? "text-red-700" : "text-green-700"
          }`}
        >
          {complaint.status == false ? "not complete" : "complete"}
        </TableCell>
        <TableCell className="w-[100px] flex gap-2 items-center">
          <i
            className="fas fa-edit text-cyan-600 dark:text-cyan-500 hover:text-cyan-800 cursor-pointer"
            onClick={() => {
              onEdit();
              setSelectedComplaintId(complaint.id);
            }}
          />
          <i
            className="fas fa-trash text-red-600 hover:text-red-800 cursor-pointer"
            onClick={() => setIsOpenConfirmModal(true)}
          />
        </TableCell>
      </TableRow>
      {isOpenConfirmModal && (
        <ConfirmationModal
          open={isOpenConfirmModal}
          setOpen={setIsOpenConfirmModal}
          title="Delete Complaint"
          description="Are you sure you want to delete this complaint?"
          onConfirm={HandleDelete}
        />
      )}

      {isPhotoModalOpen && (
        <PhotoModal photoUrl={currentPhotoUrl} onClose={closePhotoModal} />
      )}
    </>
  );
}