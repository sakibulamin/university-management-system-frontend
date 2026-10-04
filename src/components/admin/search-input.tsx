"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  defaultValue?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  defaultValue = "",
  onSearch,
  placeholder = "Search…",
}: SearchInputProps) {
  const [value, setValue] = useState(defaultValue);
  // Kept in a ref so the debounce effect's dependency array can honestly
  // list only `value` — onSearch is often a fresh inline function on
  // every render, which would otherwise re-fire the debounce timer.
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  useEffect(() => {
    const timer = setTimeout(() => onSearchRef.current(value), 400);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
    </div>
  );
}
