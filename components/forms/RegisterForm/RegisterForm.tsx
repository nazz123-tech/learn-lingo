"use client";
import { useState } from "react";
import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { registerSchema, RegisterFormData } from '@/validations/authSchemas'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface RegisterFormProps {
  onClose: () => void; 
}

export function RegisterForm({ onClose }: RegisterFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.name });
      await user.reload(); 
      onClose(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.container}>
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.header}>
        <h2 className={css.title}>Registration</h2>
        <p className={css.description}>
          Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information
        </p>
      </div>

      <div className={css.fieldWrapper}>
        <input className={css.field}
          {...register("name")}
          placeholder="Name"
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.fieldWrapper}>
        <input className={css.field}
          {...register("email")}
          placeholder="Email"
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.fieldWrapper}>
            <input className={css.field}
            {...register("password")}
            type={isVisible ? "text" : "password"}
            placeholder="Password"
          />
          {errors.password && <p className={css.error}>{errors.password.message}</p>}
          <button type="button" onClick={() => setIsVisible(prev => !prev)}>
    {!isVisible ? <IoMdEyeOff className={css.eyeIcon}/> : <IoMdEye className={css.eyeIcon}/>}
  </button>

        {errors.root && <p className={css.error}>{errors.root.message}</p>}
          </div>

      <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Sign Up"}
      </button>
    </form>
    </div>
  );
}