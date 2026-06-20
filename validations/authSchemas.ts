import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Мінімум 2 символи")
    .required("Імʼя обовʼязкове"),
  email: yup
    .string()
    .email("Невалідний email")
    .required("Email обовʼязковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обовʼязковий"),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;