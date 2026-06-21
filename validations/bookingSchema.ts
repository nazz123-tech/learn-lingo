import * as yup from "yup";

export const bookingSchema = yup.object({
    reason: yup
    .string()
    .oneOf(
      ["Career and business", "Lesson for kids", "Living abroad", "Exams and coursework", "Culture, travel or hobby"],
      "Оберіть причину"
    )
    .required("Оберіть причину"),
  fullname: yup.string().min(2, "Мінімум 2 символи").required("Повне імʼя обовʼязкове"),
    email: yup.string().email("Невалідний email").required("Email обовʼязковий"),
    number: yup
  .string()
  .matches(/^\+?[\d\s\-()]+$/, "Невалідний номер телефону")
  .min(10, "Мінімум 10 символів")
  .required("Номер телефону обовʼязковий"),
});

export type BookingFormData = yup.InferType<typeof bookingSchema>;