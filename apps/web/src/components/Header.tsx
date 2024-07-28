// components/Header.tsx

import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Event Manager</div>
        <nav className="space-x-4">
          <Link href="/register" className="text-gray-600 hover:text-gray-800">
            Register
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-800">
            Login
          </Link>
          <Link
            href="/all-events"
            className="text-gray-600 hover:text-gray-800"
          >
            All Events
          </Link>
        </nav>
      </div>
    </header>
  );
};
