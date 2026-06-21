"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";
import { Filters } from "@/types/filters";

const fetchAllTeachers = async (): Promise<Teacher[]> => {
  const snapshot = await get(ref(db, "teachers"));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.entries(data).map(([id, value]) => ({
    id,
    ...(value as Omit<Teacher, "id">),
  }));
};

const PAGE_SIZE = 4;

export function useTeachers(filters: Filters) {
  const [page, setPage] = useState(1);

  const { data: allTeachers = [], isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: fetchAllTeachers,
    staleTime: Infinity,
  });

  
  const filtered = useMemo(() => {
    return allTeachers.filter((teacher) => {
      const matchLanguage = filters.language
        ? teacher.languages.includes(filters.language)
        : true;

      const matchLevel = filters.level
        ? teacher.levels.includes(filters.level)
        : true;

      const matchPrice = filters.price
        ? teacher.price_per_hour <= filters.price
        : true;

      return matchLanguage && matchLevel && matchPrice;
    });
  }, [allTeachers, filters]);

  
  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const loadMore = () => setPage((prev) => prev + 1);

  
  const resetPage = () => setPage(1);

  return {
    teachers: paginated,
    loading: isLoading,
    hasMore,
    loadMore,
    resetPage,
  };
}