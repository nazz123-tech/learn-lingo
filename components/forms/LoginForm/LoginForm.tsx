import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { LoginFormData, loginSchema } from "@/validations/authSchemas";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import css from "./LoginForm.module.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
interface LoginFormProps {
  onClose: () => void;
}

export function LoginForm({onClose}:LoginFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,       
    handleSubmit,   
    formState: { errors, isSubmitting },
    setError, 
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema), 
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch {
      setError("root", { message: "Невірний email або пароль" });
    }
  };

  return (
     <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.title}>Log In</h2>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and continue your search for an teacher.
      </p>
      </div>
      
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
}