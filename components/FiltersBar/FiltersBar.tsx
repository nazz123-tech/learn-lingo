"use client";

import { Filters } from "@/types/filters";

const LANGUAGES = ["English", "French", "German", "Spanish", "Italian"];
const LEVELS = ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"];
const PRICES = [10, 20, 30, 40];

interface FiltersBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function FiltersBar({ filters, onChange }: FiltersBarProps) {
  const handleChange = (key: keyof Filters, value: string | number | null) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div>
      <select
        value={filters.language}
        onChange={(e) => handleChange("language", e.target.value)}
      >
        <option value="">All languages</option>
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <select
        value={filters.level}
        onChange={(e) => handleChange("level", e.target.value)}
      >
        <option value="">All levels</option>
        {LEVELS.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <select
        value={filters.price ?? ""}
        onChange={(e) => handleChange("price", e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All prices</option>
        {PRICES.map((price) => (
          <option key={price} value={price}>{price}$</option>
        ))}
      </select>
    </div>
  );
}