// pages/register.tsx

import LoginForm from '../../components/LoginForm';
import Link from 'next/link';

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Login</h2>

        <LoginForm />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{' '}
            <Link
              href={'/register'}
              className="text-purple-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
