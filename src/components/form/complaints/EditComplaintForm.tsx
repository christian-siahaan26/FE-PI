import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editComplaintSchema, EditComplaintType } from "@/lib/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useComplaintById } from "@/services/complaints/mutations/use-complaintId";
import { useEffect, useState } from "react";
import { useUpdateComplaint } from "@/services/complaints/mutations/use-update-complaint";

export default function EditComplaintForm({
  open,
  setOpen,
  complaintId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  complaintId: number;
}) {
  const { data, isLoading } = useComplaintById(complaintId);
  const [currentPhoto, setCurrentPhoto] = useState<string>("");

  const form = useForm<z.infer<typeof editComplaintSchema>>({
    resolver: zodResolver(editComplaintSchema),
    defaultValues: {
      location: "",
      description: "",
      photo: null,
      status: false,
    },
  });

  useEffect(() => {
    if (data?.data && open) {
      setCurrentPhoto(data.data.photo || "");
      
      form.reset({
        location: data.data.location || "",
        description: data.data.description || "",
        photo: null,
        status: Boolean(data.data.status),
      });
    }
  }, [data?.data, form, open]);

  const { mutate, isPending, error } = useUpdateComplaint();

  function onSubmit(formData: EditComplaintType) {
    const submitData: any = {
      id: complaintId,
      location: formData.location,
      description: formData.description,
      status: formData.status,
    };

    if (formData.photo && 
        ((formData.photo instanceof FileList && formData.photo.length > 0) || 
         formData.photo instanceof File)) {
      submitData.photo = formData.photo;
    }

    mutate(submitData, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
          setOpen(false);
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to update complaint. Please try again!"
        );
      },
    });
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Complaint</DialogTitle>
          <DialogDescription>
            Make changes to complaint data here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo (Optional - leave empty to keep current photo)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          field.onChange(files);
                        }}
                        className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md"
                      />

                      {currentPhoto && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-1">Current photo:</p>
                          <img 
                            src={currentPhoto} 
                            alt="Current complaint photo" 
                            className="w-20 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is Complete?</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 capitalize">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                      <span>Yes</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Update Complaint"}
              </Button>
              {error && (
                <p className="text-red-500 text-center mt-3">
                  {error.message}
                </p>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}