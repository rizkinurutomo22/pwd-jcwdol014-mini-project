import { FC } from 'react';

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: FC<DatePickerProps> = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg text-black">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="date"
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
);

export default DatePicker;
