"use client";

export interface Filters {
  priceLevel: number | null;
  openNow: boolean;
  minRating: number;
}

interface FilterControlsProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const priceOptions = [
  { value: null, label: "Any" },
  { value: 1, label: "$" },
  { value: 2, label: "$$" },
  { value: 3, label: "$$$" },
  { value: 4, label: "$$$$" },
];

const ratingOptions = [0, 3, 3.5, 4, 4.5];

export default function FilterControls({ filters, onChange }: FilterControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white rounded-lg shadow-sm p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Price:</span>
        <div className="flex gap-1">
          {priceOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onChange({ ...filters, priceLevel: opt.value })}
              className={`px-2.5 py-1 text-sm rounded-md transition-colors ${
                filters.priceLevel === opt.value
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Min rating:</span>
        <select
          value={filters.minRating}
          onChange={(e) =>
            onChange({ ...filters, minRating: parseFloat(e.target.value) })
          }
          className="text-sm border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-amber-400"
        >
          {ratingOptions.map((r) => (
            <option key={r} value={r}>
              {r === 0 ? "Any" : `${r}+`}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.openNow}
          onChange={(e) => onChange({ ...filters, openNow: e.target.checked })}
          className="rounded border-gray-300 text-amber-500 focus:ring-amber-400"
        />
        Open now
      </label>
    </div>
  );
}
