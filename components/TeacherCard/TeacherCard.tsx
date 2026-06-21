"use client";

import { useState } from "react";
import Image from "next/image";
import { Teacher } from "@/types/teacher";
import { useAuth } from "@/hooks/useAuth";
import {useFavorites} from "@/hooks/useFavourites";
import Modal from "@/components/Modal/Modal";
import {BookingForm }from "@/components/forms/BookingForm/BookingForm";
import { toast } from "react-toastify";
import css from "./TeacherCard.module.css";

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.warn("Ця функція доступна лише для авторизованих користувачів");
      return;
    }
    await toggleFavorite(teacher.id);
  };

  return (
    <div>
      <div>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={96}
          height={96}
        />
        <span />
      </div>

      <div>
        <div>
          <div>
            <p>Languages</p>
            <h2>{teacher.name} {teacher.surname}</h2>
          </div>

          <div>
            <span>Lessons online</span>
            <span>Lessons done: <b>{teacher.lessons_done}</b></span>
            <span>Rating: <b>{teacher.rating}</b></span>
            <span>Price / 1 hour: <b>{teacher.price_per_hour}$</b></span>
            <button onClick={handleFavorite}>
              {isFavorite(teacher.id) ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <p><span>Speaks: </span>{teacher.languages.join(", ")}</p>
        <p><span>Lesson Info: </span>{teacher.lesson_info}</p>
        <p><span>Conditions: </span>{teacher.conditions.join(", ")}</p>

        {!isExpanded && (
          <button className={css.readMoreBtn} onClick={() => setIsExpanded(true)}>
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={css.expanded}>
            <p>{teacher.experience}</p>

            <ul>
              {teacher.reviews.map((review, index) => (
                <li key={index}>
                  <p>{review.reviewer_name}</p>
                  <p>⭐ {review.reviewer_rating}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>

            <button onClick={() => setIsBookingOpen(true)}>
              Book trial lesson
            </button>
          </div>
        )}

        <ul>
          {teacher.levels.map((level) => (
            <li key={level}>#{level}</li>
          ))}
        </ul>
      </div>

      {isBookingOpen && (
        <Modal onClose={() => setIsBookingOpen(false)}>
          <BookingForm
            onClose={() => setIsBookingOpen(false)}
            teacher={teacher}
          />
        </Modal>
      )}
    </div>
  );
}