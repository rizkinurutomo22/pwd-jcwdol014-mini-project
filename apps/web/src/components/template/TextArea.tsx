import { FC } from 'react';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({ label, name, value, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg text-black">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="mt-1 block w-full rounded-md border-gray-300 px-4 py-2 text-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    />
  </div>
);

export default TextArea;
