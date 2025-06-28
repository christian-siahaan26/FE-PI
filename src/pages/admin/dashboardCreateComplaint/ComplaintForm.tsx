import { UseFormReturn } from "react-hook-form";
import { AddNewComplaintType } from "@/lib/schema";
import { Form } from "@/components/ui/form";
import ComplaintFormFields from "./ComplaintFormFields";
import { Button } from "@/components/ui/button";

interface ComplaintFormProps {
  form: UseFormReturn<AddNewComplaintType>;
  onSubmit: (data: AddNewComplaintType) => void;
  isPending: boolean;
  error?: { message?: string };
}

export default function ComplaintForm({
  form,
  onSubmit,
  isPending,
  error,
}: ComplaintFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ComplaintFormFields form={form} />
        <div>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Submitting.." : "Submit"}
          </Button>
          {error && (
            <p className="text-red-500 text-center mt-3">{error.message}</p>
          )}
        </div>
      </form>
    </Form>
  );
}

