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
import { IoMdHeart, IoMdHeartEmpty} from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { Filters } from "@/types/filters";


export default function TeacherCard({ teacher, filters }: { teacher: Teacher; filters?: Filters }) {
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
    <div className={css.contentWrapper}>
      <div className={css.around}>
        <Image
          className={css.avatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={96}
          height={96}
        />
        <img width={12} height={12} src={'/online.svg'} alt='online' className={css.online}></img>
      </div>

      <div className={css.infoWrapper}>
        <div className={css.header}>
          <div className={css.person}>
            <p className={css.title}>Languages</p>
            <h2 className={css.name}>
              {teacher.name} {teacher.surname}
            </h2>
          </div>

          <div className={css.additional}>
            <span>
              <IoBookOutline size={16} />
              Lessons online
            </span>
            <span className={css.separator}>|</span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span className={css.separator}>|</span>
            <span>
              <FaStar size={16} className={css.star} />
              Rating: {teacher.rating}
            </span>
            <span className={css.separator}>|</span>
            <span>
              Price / 1 hour:{" "}
              <span className={css.price}>{teacher.price_per_hour}$</span>
            </span>
          </div>
          <button className={css.button} onClick={handleFavorite}>
            {isFavorite(teacher.id) ? (
              <IoMdHeart size={26} className={css.favourite} />
            ) : (
              <IoMdHeartEmpty className={css.emptyIcon} size={26} />
            )}
          </button>
        </div>
        <div className={css.conditions}>
          <p>
            <span>Speaks: </span>
            {teacher.languages.join(", ")}
          </p>
          <p>
            <span>Lesson Info: </span>
            {teacher.lesson_info}
          </p>
          <p>
            <span>Conditions: </span>
            {teacher.conditions.join(", ")}
          </p>
        </div>

        {!isExpanded && (
          <button
            className={css.readMoreBtn}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

          <div className={`${css.expanded} ${isExpanded ? css.expandedVisible : ""}`}>
            <p className={css.experience}>{teacher.experience}</p>

            <ul className={css.reviewList}>
              {teacher.reviews.map((review, index) => (
                <li className={css.review} key={index}>
                  <div className={css.reviewer}>
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        review.reviewer_name,
                      )}&background=random&rounded=true`}
                      width={44}
                      height={44}
                      alt={review.reviewer_name}
                    />
                    <div className={css.reviewInfo}>
                      <p className={css.reviewName}>{review.reviewer_name}</p>
                      <p className={css.reviewRating}>
                        <FaStar size={16} className={css.star} /> {review.reviewer_rating}.0
                      </p>
                    </div>
                  </div>

                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>

           
          </div>


        <ul className={css.languageList}>
          {teacher.levels.map((level) => (
            <li
      className={`${css.language} ${filters?.level === level ? css.languageActive : ''}`}
      key={level}
    >
              #{level}
            </li>
          ))}
        </ul>
        {isExpanded &&  <button
              className={css.bookingBtn}
              onClick={() => setIsBookingOpen(true)}
            >
              Book trial lesson
            </button>}
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