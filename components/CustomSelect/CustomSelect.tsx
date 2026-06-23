// CustomSelect.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import css from './CustomSelect.module.css'

interface Props {
  label: string
  wide: string
  options: { label: string; value: string | number | null }[]
  value: string | number | null
  onChange: (val: string | number | null) => void
}

export const CustomSelect = ({ wide,label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div style={{width: wide}} className={css.wrapper} ref={ref}>
      <p className={css.label}>{label}</p>

      <button className={css.trigger} onClick={() => setOpen(o => !o)}>
        <span>{selected?.label ?? label}</span>
        <svg className={`${css.arrow} ${open ? css.arrowOpen : ''}`}
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className={css.dropdown}>
          {options.map(opt => (
            <li
              key={String(opt.value)}
              className={`${css.option} ${opt.value === value ? css.selected : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}