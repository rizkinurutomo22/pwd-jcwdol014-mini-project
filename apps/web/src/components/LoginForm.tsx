'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCookie, setCookies } from '@/actions/cookies';

const LoginForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email or password')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Invalid email or password')
        .matches(/[A-Z]/, 'Invalid email or password')
        .matches(/[a-z]/, 'Invalid email or password')
        .matches(/[0-9!@#$%^&*(),.?":{}|<>]/, 'Invalid email or password')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
          values,
        );

        deleteCookie('token');
        await setCookies('token', response.data.token);

        router.push('/event-dashboard');
      } catch (err) {
        setError('Login failed. Please check your credentials.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
