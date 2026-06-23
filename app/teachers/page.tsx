"use client";

import { useState } from "react";
import { useTeachers } from "@/hooks/useTeachers";
import { FiltersBar } from "@/components/FiltersBar/FiltersBar";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { Filters } from "@/types/filters";
import css from './page.module.css'
import { Loader } from "@/components/Loader/Loader";

const defaultFilters: Filters = {
  language: "",
  level: "",
  price: null,
};

export default function TeachersPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { teachers, loading, hasMore, loadMore, resetPage } = useTeachers(filters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    resetPage();
  };

  return (
    <main className={css.main}>
      <FiltersBar filters={filters} onChange={handleFilterChange} />
      <div className={css.container}>
           <ul className={css.list}>
        {teachers.map((teacher) => (
          <li className={css.item} key={teacher.id}>
            <TeacherCard filters={filters} teacher={teacher} />
          </li>
        ))}
      </ul>
      {loading && <Loader/>}

      {hasMore && !loading && (
        <button className={css.loadMoreBtn} onClick={loadMore}>Load more</button>
      )}
      </div>
     

      
    </main>
  );
}