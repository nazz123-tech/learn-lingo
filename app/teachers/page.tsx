"use client";

import { useState } from "react";
import { useTeachers } from "@/hooks/useTeachers";
import { FiltersBar } from "@/components/FiltersBar/FiltersBar";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { Filters } from "@/types/filters";

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
    <main>
      <FiltersBar filters={filters} onChange={handleFilterChange} />

      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>

      {loading && <p>Завантаження...</p>}

      {hasMore && !loading && (
        <button onClick={loadMore}>Load more</button>
      )}
    </main>
  );
}