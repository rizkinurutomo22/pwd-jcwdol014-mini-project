'use client';

import { serialize, parse } from 'cookie';

export const setCookies = (name: string, value: string) => {
  document.cookie = serialize(name, value, {
    path: '/',
    httpOnly: false, // Set to true if want to protect the cookie from client-side JavaScript
    secure: process.env.NODE_ENV === 'production', // Only set to true in production
    maxAge: 60 * 60 * 1,
  });
};

export const deleteCookie = (name: string) => {
  document.cookie = serialize(name, '', {
    path: '/',
    maxAge: -1,
  });
};

export const getCookie = (name: string) => {
  const cookies = parse(document.cookie);
  return cookies[name];
};
