import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BookingFormData, bookingSchema } from "../../../validations/bookingSchema"
import { Teacher } from "@/types/teacher";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { set} from "firebase/database";
import { ref } from "firebase/database";
import { db } from "@/lib/firebase";    

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Booking Trial Lesson</h2>
                <div>
                    <h3>Teacher: {teacher.name} {teacher.surname}</h3>
                    <p>{teacher.lesson_info}</p>
                </div>
                <div>
                     {REASONS.map(reason => (
                    <div key={reason}>
                        <input type="radio" value={reason} {...register("reason")} />
                        <label>{reason}</label>
                    </div>
                ))}
                {errors.reason && <p>{errors.reason.message}</p>}
                </div>
                <div>
                    <input
                        {...register("fullname")}
                        placeholder="Full Name"
                    />
                    {errors.fullname && <p>{errors.fullname.message}</p>}
                </div>
                <div>
                    <input
                        {...register("email")}
                        placeholder="Email"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register("number")}
                        placeholder="Phone Number"
                    />
                    {errors.number && <p>{errors.number.message}</p>}
                </div>
                {errors.root && <p>{errors.root.message}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Book Now"}
                </button>
            </form>
        </div>
        );
    }