"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ref, query, limitToFirst, startAt, orderByKey, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";

const PAGE_SIZE = 4;

const fetchTeachers = async (startIndex: number): Promise<Teacher[]> => {
  const teachersRef = ref(db, "teachers");

  const q = query(
    teachersRef,
    orderByKey(),
    startAt(String(startIndex)),
    limitToFirst(PAGE_SIZE + 1)
  );

  const snapshot = await get(q);
  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.entries(data).map(([id, value]) => ({
    id,
    ...(value as Omit<Teacher, "id">),
  }));
};

export function useTeachers() {
  const [startIndex, setStartIndex] = useState(0);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, isFetching } = useQuery({
    queryKey: ["teachers", startIndex],
    queryFn: async () => {
      const list = await fetchTeachers(startIndex);

      const isMore = list.length > PAGE_SIZE;
      const newTeachers = isMore ? list.slice(0, PAGE_SIZE) : list;

      setAllTeachers((prev) => [...prev, ...newTeachers]);
      setHasMore(isMore);

      return newTeachers;
    },
    staleTime: Infinity, 
  });

  const loadMore = () => {
    if (hasMore) setStartIndex((prev) => prev + PAGE_SIZE);
  };

  return {
    teachers: allTeachers,
    loading: isLoading || isFetching,
    hasMore,
    loadMore,
  };
}