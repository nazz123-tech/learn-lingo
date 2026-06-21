"use client"

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";

const getFavoriteTeachers = async (uid: string): Promise<Teacher[]> => {

  const favSnapshot = await get(ref(db, `users/${uid}/favorites`));

  if (!favSnapshot.exists()) return [];

  const favKeys: string[] = Object.keys(favSnapshot.val());


  const promises = favKeys.map((id) => get(ref(db, `teachers/${id}`)));
  const snapshots = await Promise.all(promises);

 
  return snapshots
    .filter((snap) => snap.exists())
    .map((snap) => ({
      id: snap.key as string,
      ...snap.val(),
    }));
};

export function useFavouritesTeachers() {
  const { user } = useAuth();

  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.uid],
    queryFn: () => getFavoriteTeachers(user!.uid),
    enabled: !!user, 
  });

  return { teachers, isLoading };
}