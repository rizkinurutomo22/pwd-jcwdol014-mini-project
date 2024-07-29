'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      referralCode: '',
      role: 'user',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /[A-Z]/,
          'Password must contain at least one uppercase letter, at least one lowercase letter, at least one number or special character',
        )
        .matches(
          /[a-z]/,
          'Password must contain at least one uppercase letter, at least one lowercase letter, at least one number or special character',
        )
        .matches(
          /[0-9!@#$%^&*(),.?":{}|<>]/,
          'Password must contain at least one uppercase letter, at least one lowercase letter, at least one number or special character',
        )
        .required('Required'),
      referralCode: Yup.string(),
      role: Yup.string().oneOf(['user', 'organizer']).required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
          values,
        );
        router.push('/login');
      } catch (err) {
        setError('Registration failed. Please try again.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          {...formik.getFieldProps('username')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-600 text-sm">{formik.errors.username}</div>
        ) : null}
      </div>
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
        <label
          htmlFor="referralCode"
          className="block text-sm font-medium text-gray-700"
        >
          Referral Code (optional)
        </label>
        <input
          id="referralCode"
          type="text"
          {...formik.getFieldProps('referralCode')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          {...formik.getFieldProps('role')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div className="text-red-600 text-sm">{formik.errors.role}</div>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-purple-600 py-2 rounded-md shadow-md hbg-purple-600 px-6 text-white transition duration-150 ease-in-out hover:scale-105 hover:bg-purple-500"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
