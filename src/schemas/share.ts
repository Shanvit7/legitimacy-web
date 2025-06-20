import { z } from "zod";
// CONSTANTS
import { DEVICE_TYPES } from "@/utils/constants";

export const sharePDFFormSchema = z.object({
  pdf: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    }),
  expiryTime: z.date().min(new Date(), "Expiry time is required"),
  deviceType: z.enum(DEVICE_TYPES as [string, ...string[]], {
    required_error: "Device type is required",
  }),
  recipientEmail: z.string().email("Invalid email"),
  downloadLimit: z.coerce.number().int().min(1).max(5)
    .refine((val) => val > 0 && val <= 5, {
      message: "Must be a number between 1-5",
    }),
});

export type SharePDFData = z.infer<typeof sharePDFFormSchema>;
