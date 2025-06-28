import z from "zod";

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export const PhonePattern = /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;

// export const addNewComplaintSchema = z.object({
//   name: z.string().nonempty("Name is required").min(1, "Name min 3 character"),
//   no_hp: z
//     .string()
//     .nonempty("No_Telp is required")
//     .min(9, "No_Telp Min 8 Number")
//     .regex(PhonePattern, "Invalid phone number"),
//   status_hadir: z.boolean(),
// });

export const addNewComplaintSchema = z.object({
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location can't be more than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description can't be more than 500 characters"),
  photo: z
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "Photo is required",
    })
    .refine((file) => file instanceof FileList && file[0].size < 5_000_000, {
      message: "File size must be less than 5MB",
    }),
});

export type AddNewComplaintType = z.infer<typeof addNewComplaintSchema>;

// export const editComplaintSchema = z.object({
//   name: z.string().nonempty("Name is required").min(1, "Name min 3 character"),
//   no_hp: z
//     .string()
//     .nonempty("No_Telp is required")
//     .min(9, "No_Telp Min 8 Number")
//     .regex(PhonePattern, "Invalid phone number"),
//   status_hadir: z.boolean(),
// });
export const editComplaintSchema = z.object({
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Title can't be more than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Content can't be more than 500 characters"),
  // status: z.enum(["pending", "complete"]),
  status: z.boolean(),
  photo: z.any().optional(),
});
export type EditComplaintType = z.infer<typeof editComplaintSchema>;
