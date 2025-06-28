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
import { useEffect } from "react";
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

  const form = useForm<z.infer<typeof editComplaintSchema>>({
    resolver: zodResolver(editComplaintSchema),
    defaultValues: {
      location: "",
      description: "",
      photo: "",
      status: false,
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        location: data.data.location || "",
        description: data.data.description || "",
        photo: data.data.photo || "",
        status: data.data.status || false,
      });
    }
  }, [data?.data, form]);

  const { mutate, isPending, error } = useUpdateComplaint();

  function onSubmit(formData: EditComplaintType) {
    mutate(
      { id: complaintId, ...formData },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message);
            form.reset();
            setOpen(false);
          }
        },
        onError: (data) => {
          toast.error(
            data.message || "Failed to create complaint. Please try again!"
          );
        },
      }
    );
  }

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to complaint data here. Click save when you're done.
          </DialogDescription>
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
                    <FormLabel>Desctription</FormLabel>
                    <FormControl>
                      <Input placeholder="Desctription" {...field} />
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
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                        className="block w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-md"
                      />
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
                          checked={!!field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                        <span>yes</span>
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
                  {isPending ? "Submitting.." : "Submit"}
                </Button>
                {error && (
                  <p className="text-red-500 text-center mt-3">
                    {error.message}
                  </p>
                )}
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
