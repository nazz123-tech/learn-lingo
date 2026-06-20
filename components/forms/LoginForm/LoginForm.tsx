import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "@/validations/authSchemas";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface LoginFormProps {
  onClose: () => void;
}

export function LoginForm({onClose}:LoginFormProps) {

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
     <div >
      <h2>Увійти</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && <p >{errors.password.message}</p>}
        </div>

        {errors.root && <p>{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Завантаження..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}