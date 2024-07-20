// src/components/Button.tsx
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      {children}
    </button>
  );
};

export default Button;
