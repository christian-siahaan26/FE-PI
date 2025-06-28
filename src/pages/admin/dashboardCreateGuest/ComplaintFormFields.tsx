import { UseFormReturn } from "react-hook-form";
import { AddNewComplaintType } from "@/lib/schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";

interface ComplaintFormFieldsProps {
  form: UseFormReturn<AddNewComplaintType>;
}

export default function ComplaintFormFields({
  form,
}: ComplaintFormFieldsProps) {
  return (
    <>
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
      {/* <FormField
        control={form.control}
        name="status_hadir"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Is Present?</FormLabel>
            <FormControl>
              <div className="flex items-center gap-2 capitalize">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <span>yes</span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </>
  );
}
