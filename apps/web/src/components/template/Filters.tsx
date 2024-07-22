import React, { ChangeEvent } from 'react';

interface FiltersProps {
  filters: {
    category: string;
    location: string;
    label: string;
  };
  setFilters: (filters: {
    category: string;
    location: string;
    label: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="mb-4">
      <select
        name="category"
        value={filters.category}
        onChange={handleInputChange}
        className="mr-2 w-60 border p-2"
      >
        <option value="all-category">All Category</option>
        <option value="music">Music</option>
        <option value="stand-up">Stand Up</option>
        <option value="festival">Festival</option>
      </select>
      <select
        name="label"
        value={filters.label}
        onChange={handleInputChange}
        className="mr-2 w-60 border p-2"
      >
        <option value="all-label">All label</option>
        <option value="upcoming">Upcoming Event</option>
        <option value="premiere">Premiere Event</option>
        <option value="promotion">Promotion Event</option>
      </select>
      <input
        type="text"
        name="location"
        value={filters.location}
        onChange={handleInputChange}
        placeholder="Location"
        className="w-60 border p-2"
      />
    </div>
  );
};

export default Filters;
