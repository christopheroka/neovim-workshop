"use client";

import { FILTERS, type Filter } from "@/lib/todos";

type Props = {
    filter: Filter;
    counts: Record<Filter, number>;
    onChange: (filter: Filter) => void;
};

export default function TodoFilters({ filter, counts, onChange }: Props) {
    return (
        <div className="mb-4 flex gap-2">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    type="button"
                    onClick={() => onChange(f)}
                    aria-pressed={filter === f}
                    className={`cursor-pointer rounded-full px-3 py-1 text-sm capitalize transition-colors ${
                        filter === f
                            ? "bg-black text-white"
                            : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                >
                    {f}
                    <span className="ml-1.5 opacity-60">{counts[f]}</span>
                </button>
            ))}
        </div>
    );
}
