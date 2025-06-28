import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddNewComplaintType, addNewComplaintSchema } from "@/lib/schema";
import { AddNewComplaintDefaultValues } from "@/utils/constants";
import { useCreateComplaints } from "@/services/complaints/mutations/use-create-complaints";
import { toast } from "sonner";
import ComplaintForm from "./ComplaintForm";
import { CreateComplaintDto } from "@/types/complaint";

export default function AddComplaintPage() {
  const form = useForm<AddNewComplaintType>({
    resolver: zodResolver(addNewComplaintSchema),
    defaultValues: AddNewComplaintDefaultValues,
  });

  const { mutate, isPending, error } = useCreateComplaints();

  function onSubmit(formData: AddNewComplaintType) {
    console.log("Validating photo:");
    console.log(formData.photo);

    // Validasi photo
    if (!formData.photo) {
      toast.error("Photo is required");
      return;
    }

    let photoFile: File;

    // Handle FileList atau File
    if (formData.photo instanceof FileList) {
      console.log("Is FileList:", true);
      console.log("Length:", formData.photo.length);

      if (formData.photo.length === 0) {
        toast.error("Photo is required");
        return;
      }
      photoFile = formData.photo[0];
    } else if (formData.photo instanceof File) {
      photoFile = formData.photo;
    } else {
      toast.error("Invalid photo format");
      return;
    }

    // Validasi ukuran file
    if (photoFile.size > 5_000_000) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Validasi tipe file
    if (!photoFile.type.startsWith("image/")) {
      toast.error("File must be an image");
      return;
    }

    console.log("Submitting form data:");
    console.log({
      location: formData.location,
      description: formData.description,
      photo: formData.photo,
    });

    // Transform data untuk API
    const apiData: CreateComplaintDto = {
      location: formData.location,
      description: formData.description,
      photo: photoFile, // Kirim File object, bukan FileList
    };

    console.log("API data: ");
    console.log(apiData);

    mutate(apiData, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          form.reset();
        }
      },
      onError: (error) => {
        console.error("Upload error:", error);
        toast.error(
          error.message || "Failed to create complaint. Please try again!"
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
