"use client";

export default function ProductFilters({ selected, setSelected }) {

  const toggleFilter = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const filters = ["Joya", "Reloj", "Hogar", "Ofertas", "Accesorios"];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const isActive = selected.includes(filter);

        return (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`
              px-4 py-2 rounded-full text-sm transition-all duration-200 border
              ${
                isActive
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md"
                  : "bg-white text-[var(--color-fourth)] border-gray-200 hover:border-[var(--color-primary)]"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}