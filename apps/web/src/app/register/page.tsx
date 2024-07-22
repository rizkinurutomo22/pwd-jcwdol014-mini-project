'use client';

import { useState } from 'react';
import Link from 'next/link';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [referralCode, setReferralCode] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registered As
            </label>
            <select
              name="select-register-role"
              id="select-register-role"
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="user">User</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Referral Code (optional)
            </label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <br />
          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 py-2 text-white hover:bg-purple-500"
          >
            Register
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Have an account?{' '}
            <Link href={'/login'} className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
