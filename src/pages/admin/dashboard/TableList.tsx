import ConfirmationModal from "@/components/ConfirmationModal";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteComplaint } from "@/services/complaints/mutations/soft-delete-complaints";
import { Complaint } from "@/types/complaint";
import { useState } from "react";
import { toast } from "sonner";

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
        <TableCell className="w-[100px]">{complaint.description}</TableCell>
        <TableCell className="w-[100px]">
          {complaint.photo ? (
            <img
              src={complaint.photo}
              alt="Complaint photo"
              className="w-16 h-16 object-cover rounded"
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
    </>
  );
}
