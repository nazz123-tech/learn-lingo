"use client";
import { useState } from "react";
import { useTeachers } from "@/hooks/useTeachers";
import { FiltersBar } from "@/components/FiltersBar/FiltersBar";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { Filters } from "@/types/filters";
import css from './page.module.css';
import { Loader } from "@/components/Loader/Loader";


const AnimatedItem = ({ children, index }: { children: React.ReactNode, index: number }) => (
  <li 
    className={css.item} 
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    {children}
  </li>
);

export default function TeachersPageClient() {
  const [filters, setFilters] = useState<Filters>({ language: "", level: "", price: null });
  const { teachers, loading, hasMore, loadMore, resetPage } = useTeachers(filters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    resetPage();
  };

  return (
    <main className={css.main}>
      
      
      <div className={css.container}>
        <FiltersBar filters={filters} onChange={handleFilterChange} />
        <ul className={css.list}>
          {teachers.map((teacher, index) => (
            <AnimatedItem key={teacher.id} index={index}>
              <TeacherCard filters={filters} teacher={teacher} />
            </AnimatedItem>
          ))}
        </ul>

        {loading && <Loader />}

        {hasMore && !loading && (
          <button className={css.loadMoreBtn} onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    </main>
  );
}