"use client"
import {useFavouritesTeachers} from "@/hooks/useFavouritesTeachers";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { useAuth } from "@/hooks/useAuth";
import {useRouter }from "next/navigation";
import { useEffect } from "react";
export default function FavouritesPage() {
    const { teachers, isLoading } = useFavouritesTeachers();
    const { user, loading}=useAuth();
    const router = useRouter();
    useEffect(() => {
    if (!loading && !user) {
      router.push("/teachers");
    }
  }, [user, loading, router]);

  if (loading) return <p>Завантаження...</p>;
  if (!user) return null;
  return (
    <main>
      <h1>Favourites</h1>
      {teachers.length === 0 && !isLoading && <p>У вас немає улюблених викладачів</p>}
        <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
        {isLoading && <p>Завантаження...</p>}
      </ul>
    </main>
  );
}