"use client"
import {useFavouritesTeachers} from "@/hooks/useFavouritesTeachers";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { useAuth } from "@/hooks/useAuth";
import {useRouter }from "next/navigation";
import { useEffect } from "react";
import css from './page.module.css'
import { Loader } from "@/components/Loader/Loader";

export default function FavouritesPage() {
    const { teachers, isLoading } = useFavouritesTeachers();
    const { user, loading}=useAuth();
    const router = useRouter();
    useEffect(() => {
    if (!loading && !user) {
      router.push("/teachers");
    }
  }, [user, loading, router]);

  if (loading) return <Loader/>;
  if (!user) return null;
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Favourites</h1>
      {teachers.length === 0 && !isLoading && <p className={css.subtitle}>У вас немає улюблених викладачів</p>}
        <ul className={css.list}>
        {teachers.map((teacher) => (
          <li className={css.item} key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
        {isLoading && <Loader/>}
      </ul>
      </div>
      
    </main>
  );
}