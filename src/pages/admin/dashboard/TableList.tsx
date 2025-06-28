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
  setSelectedGuestId,
}: {
  complaint: Complaint;
  idx: number;
  onEdit: () => void;
  setSelectedGuestId: (complaintId: number) => void;
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
        <TableCell className="w-[100px]">{complaint.location}</TableCell>
        <TableCell className="w-[100px]">{complaint.description}</TableCell>
        <TableCell className="w-[100px]">{complaint.photo}</TableCell>
        <TableCell
          className={`w-[100px]  font-semibold uppercase ${
            complaint.status == false ? "text-red-700" : "text-green-700"
          }`}
        >
          {complaint.status == false ? "not present" : "present"}
        </TableCell>
        <TableCell className="w-[100px] flex gap-2 items-center">
          <i
            className="fas fa-edit text-cyan-600 dark:text-cyan-500 hover:text-cyan-800 cursor-pointer"
            onClick={() => {
              onEdit();
              setSelectedGuestId(complaint.id);
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
