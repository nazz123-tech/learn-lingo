import * as yup from "yup";

export const bookingSchema = yup.object({
    reason: yup
    .string()
    .oneOf(
      ["Career and business", "Lesson for kids", "Living abroad", "Exams and coursework", "Culture, travel or hobby"],
      "Choose a valid reason"
    )
    .required("Choose a valid reason"),
  fullname: yup.string().min(2, "Minimum 2 characters").required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    number: yup
  .string()
  .matches(/^\+?[\d\s\-()]+$/, "Invalid phone number")
  .min(10, "Minimum 10 characters")
  .required("Phone number is required"),
});

export type BookingFormData = yup.InferType<typeof bookingSchema>;