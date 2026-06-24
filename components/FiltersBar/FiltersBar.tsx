
"use client";

import { Filters } from "@/types/filters";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import css from './FiltersBar.module.css'

const LANGUAGES = [
  { label: "All languages", value: null },
  { label: "English", value: "English" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Spanish", value: "Spanish" },
  { label: "Italian", value: "Italian" },
];

const LEVELS = [
  { label: "All levels", value: null },
  { label: "A1 Beginner", value: "A1 Beginner" },
  { label: "A2 Elementary", value: "A2 Elementary" },
  { label: "B1 Intermediate", value: "B1 Intermediate" },
  { label: "B2 Upper-Intermediate", value: "B2 Upper-Intermediate" },
  { label: "C1 Advanced", value: "C1 Advanced" },
  { label: "C2 Proficient", value: "C2 Proficient" },
];

const PRICES = [
  { label: "All prices", value: null },
  { label: "10 $", value: 10 },
  { label: "20 $", value: 20 },
  { label: "30 $", value: 30 },
  { label: "40 $", value: 40 },
];

interface FiltersBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function FiltersBar({ filters, onChange }: FiltersBarProps) {
  return (
    <div className={css.container}>
      <CustomSelect
      wide={'221px'}
        label="Languages"
        options={LANGUAGES}
        value={filters.language ?? null}
        onChange={(val) => onChange({ ...filters, language: val as string | null })}
      />
      <CustomSelect
      wide={'260px'}
        label="Level of knowledge"
        options={LEVELS}
        value={filters.level ?? null}
        onChange={(val) => onChange({ ...filters, level: val as string | null })}
      />
      <CustomSelect
      wide={'150px'}
        label="Price"
        options={PRICES}
        value={filters.price ?? null}
        onChange={(val) => onChange({ ...filters, price: val as number | null })}
      />
    </div>
  );
}
