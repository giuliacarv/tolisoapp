import { chipActive, chipIdle } from "../primitives";

export interface QuickFilterOption {
  id: string;
  label: string;
}

export interface QuickFiltersProps {
  options: readonly QuickFilterOption[];
  activeId: string;
  onSelect: (id: string) => void;
}

/** Chips de filtro rápido da vitrine. */
export function QuickFilters({ options, activeId, onSelect }: QuickFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(id)}
            className={isActive ? chipActive : chipIdle}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
