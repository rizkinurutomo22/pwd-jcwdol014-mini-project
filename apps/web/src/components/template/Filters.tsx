import React, { ChangeEvent, useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FiltersProps {
  filters: {
    category: string;
    label: string;
  };
  setFilters: (filters: { category: string; label: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
  };

  const handleSubmitFilter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilters(localFilters);
    router.push(`/all-event`);
  };

  return (
    <div className="mb-4 justify-center md:flex">
      <select
        name="category"
        value={localFilters.category}
        onChange={handleInputChange}
        className="mb-4 mr-4 w-full rounded-xl border p-2 px-4 md:w-60"
      >
        <option value="">All Category</option>
        <option value="Music">Music</option>
        <option value="Stand Up">Stand Up</option>
        <option value="Festival">Festival</option>
      </select>
      <select
        name="label"
        value={localFilters.label}
        onChange={handleInputChange}
        className="mb-4 mr-4 w-full rounded-xl border p-2 px-4 md:w-60"
      >
        <option value="">All Label</option>
        <option value="upcoming">Upcoming Event</option>
        <option value="premiere">Premiere Event</option>
        <option value="promotion">Promotion Event</option>
      </select>
      <button
        type="button"
        className="mb-10 mt-4 w-full bg-slate-200 px-8 py-1 text-2xl text-black hover:bg-slate-100 md:mb-4 md:mt-0 md:w-auto"
        onClick={handleSubmitFilter}
      >
        ➔
      </button>
    </div>
  );
};

export default Filters;
