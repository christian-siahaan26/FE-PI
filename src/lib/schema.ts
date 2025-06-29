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
    .refine((files) => {
      console.log("Validating photo:", files);
      console.log("Is FileList:", files instanceof FileList);
      console.log("Length:", files?.length);
      
      return files instanceof FileList && files.length > 0;
    }, {
      message: "Photo is required",
    })
    .refine((files) => {
      if (files instanceof FileList && files.length > 0) {
        return files[0].size < 5_000_000;
      }
      return true;
    }, {
      message: "File size must be less than 5MB",
    }),
});

export type AddNewComplaintType = z.infer<typeof addNewComplaintSchema>;

// PERBAIKIAAN UTAMA: Schema edit yang lebih fleksibel
export const editComplaintSchema = z.object({
  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location can't be more than 100 characters")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description can't be more than 500 characters")
    .optional(),
  status: z.boolean().optional(),
  photo: z
    .any()
    .nullable()
    .optional()
    .refine((files) => {
      // Jika null, undefined, atau tidak ada perubahan foto - selalu valid
      if (files === null || files === undefined) return true;
      
      // Jika FileList kosong - tidak ada foto baru dipilih, tetap valid
      if (files instanceof FileList && files.length === 0) return true;
      
      // Jika ada file baru yang dipilih
      if (files instanceof FileList && files.length > 0) return true;
      if (files instanceof File) return true;

      return true; // Default ke true untuk kasus lainnya
    }, {
      message: "Invalid file format",
    })
    .refine((files) => {
      // Validasi ukuran file hanya jika ada file baru
      if (!files || files === null || files === undefined) return true;
      if (files instanceof FileList && files.length === 0) return true;

      if (files instanceof File) {
        return files.size < 5_000_000;
      } 

      if (files instanceof FileList && files.length > 0) {
        return files[0].size < 5_000_000;
      }

      return true;
    }, {
      message: "File size must be less than 5MB",
    }),
});

export type EditComplaintType = z.infer<typeof editComplaintSchema>;

// TAMBAHAN: Schema khusus untuk update status saja
export const updateStatusSchema = z.object({
  status: z.boolean(),
});

export type UpdateStatusType = z.infer<typeof updateStatusSchema>;