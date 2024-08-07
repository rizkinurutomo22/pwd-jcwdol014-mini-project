import { FC } from 'react';

interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  disabled,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg text-black">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
    />
  </div>
);

export default Input;
