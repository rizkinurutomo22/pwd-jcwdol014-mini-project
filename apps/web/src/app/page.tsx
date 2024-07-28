// app/page.tsx

import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">
        Welcome to Event Manager
      </h1>
      <div>
        <Link
          href="/register"
          className="inline-block bg-blue-500 text-white text-lg py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mr-6"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="inline-block bg-green-500 text-white text-lg py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mr-6"
        >
          Login
        </Link>
        <Link
          href="/all-events"
          className="inline-block bg-purple-500 text-white text-lg py-3 px-6 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
        >
          All Events
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
