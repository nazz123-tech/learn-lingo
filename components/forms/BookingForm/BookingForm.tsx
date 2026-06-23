import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingFormData, bookingSchema } from "../../../validations/bookingSchema"
import { Teacher } from "@/types/teacher";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { set} from "firebase/database";
import { ref } from "firebase/database";
import { db } from "@/lib/firebase";  
import css from "./BookingForm.module.css";  

interface BookingFormProps {
    onClose: () => void,
    teacher: Teacher,
}
const REASONS = ["Career and business", "Lesson for kids", "Living abroad", "Exams and coursework", "Culture, travel or hobby"];

export function BookingForm({onClose, teacher}:BookingFormProps) {
    const {user}= useAuth();
    const {
        register,       
        handleSubmit,   
        formState: { errors, isSubmitting },
        setError, 
        reset,
      } = useForm<BookingFormData>({
        resolver: yupResolver(bookingSchema),
      });

      const onSubmit = async (data: BookingFormData) => {
        try {
          if(data && user) {
            await set(
          ref(db, `users/${user.uid}/trials/${teacher.id}`),
          {
            teacherName: `${teacher.name} ${teacher.surname}`,
            bookedAt: Date.now(),
          }
        );
            toast.success("Бронювання успішне! Очікуйте на відповідь від викладача.");
            reset();
          }
          onClose();
        } catch {
          setError("root", { message: "Помилка при створенні бронювання" });
        }
      };
      return (
        <div className={css.container}>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={css.header}>
                    <h2 className={css.title}>Booking Trial Lesson</h2>
                    <p className={css.description}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>  
                </div>
                <div className={css.teacherInfo}>
                    <img className={css.avatar} src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} />
                    <div className={css.teacherDetails}>
                        <h3 className={css.subtitle}>Your Teacher</h3>
                    <span className={css.teacherName}>{teacher.name} {teacher.surname}</span>
                    </div>
                </div>
                <div className={css.radioGroup}>
                    <h3 className={css.radioTitle}></h3>
                     {REASONS.map(reason => (
                    <div className={css.radioWrapper} key={reason}>
                        <input className={css.radio} id={reason} type="radio" value={reason} {...register("reason")} />
                        <label className={css.radioLabel} htmlFor={reason}>
                            {reason}
                        </label>
                    </div>
                ))}
                {errors.reason && <p className={css.error}>{errors.reason.message}</p>}
                </div>
                <div className={css.fieldWrapper}>
                    <input className={css.field}
                        {...register("fullname")}
                        placeholder="Full Name"
                    />
                    {errors.fullname && <p className={css.error}>{errors.fullname.message}</p>}
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
                        {...register("number")}
                        placeholder="Phone Number"
                    />
                    {errors.number && <p className={css.error}>{errors.number.message}</p>}
                </div>
                {errors.root && <p className={css.error}>{errors.root.message}</p>}
                <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Book Now"}
                </button>
            </form>
        </div>
        );
    }