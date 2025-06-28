import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewComplaintType, addNewComplaintSchema } from "@/lib/schema";
import { AddNewComplaintDefaultValues } from "@/utils/constants";
import { useCreateComplaints } from "@/services/complaints/mutations/use-create-complaints";
import { toast } from "sonner";
import ComplaintForm from "./ComplaintForm";

export default function AddGuestPage() {
  const form = useForm<AddNewComplaintType>({
    resolver: zodResolver(addNewComplaintSchema),
    defaultValues: AddNewComplaintDefaultValues,
  });

  const { mutate, isPending, error } = useCreateComplaints();

  function onSubmit(formData: AddNewComplaintType) {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          form.reset();
        }
      },
      onError: (data) => {
        toast.error(
          data.message || "Failed to create guest. Please try again!"
        );
      },
    });
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Complaint Form</h1>
      <ComplaintForm
        form={form}
        onSubmit={onSubmit}
        isPending={isPending}
        error={error ? { message: error.message } : undefined}
      />
    </div>
  );
}
