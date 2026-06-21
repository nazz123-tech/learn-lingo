"use client";

import { useState, useEffect } from "react";
import { ref, set, remove, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
const queryClient = useQueryClient();
  useEffect(() => {
    if (!user) {
      setFavorites({});
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const snapshot = await get(ref(db, `users/${user.uid}/favorites`));
        setFavorites(snapshot.exists() ? snapshot.val() : {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);
  const addFavorite = async (teacherId: string) => {
    if (!user) return;
    await set(ref(db, `users/${user.uid}/favorites/${teacherId}`), true);
    setFavorites((prev) => ({ ...prev, [teacherId]: true }));
    queryClient.invalidateQueries({ queryKey: ["favorites", user.uid] });
    toast.success("Додано до улюблених!");
  };


  const removeFavorite = async (teacherId: string) => {
    if (!user) return;
    await remove(ref(db, `users/${user.uid}/favorites/${teacherId}`));
    setFavorites((prev) => {
      const updated = { ...prev };
      delete updated[teacherId];
      return updated;
    })
    queryClient.invalidateQueries({ queryKey: ["favorites", user.uid] });
    toast.info("Видалено з улюблених!");
  }
  const isFavorite = (teacherId: string): boolean => {
    return !!favorites[teacherId];
  };

  const toggleFavorite = async (teacherId: string) => {
    if (isFavorite(teacherId)) {
      await removeFavorite(teacherId);
    } else {
      await addFavorite(teacherId);
    }
  };

  return { favorites, loading, isFavorite, toggleFavorite };
}