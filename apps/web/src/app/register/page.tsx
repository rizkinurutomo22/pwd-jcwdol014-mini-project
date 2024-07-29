// pages/register.tsx

import RegisterForm from '../../components/RegisterForm';
import Link from 'next/link';

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Register</h2>

        <RegisterForm />
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
