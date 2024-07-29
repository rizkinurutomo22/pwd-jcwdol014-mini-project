import { FC } from 'react';

interface TimePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimePicker: FC<TimePickerProps> = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg text-black">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="time"
      value={value}
      onChange={onChange}
      className="mt-1 block h-10 w-full rounded-md border-gray-300 px-4 py-6 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
);

export default TimePicker;
