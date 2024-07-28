import { FC } from 'react';

interface SelectProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({ label, name, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-lg text-black">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        {Array.isArray(options) ? (
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option value="">Invalid options</option>
        )}
      </select>
    </div>
  );
};

export default Select;
