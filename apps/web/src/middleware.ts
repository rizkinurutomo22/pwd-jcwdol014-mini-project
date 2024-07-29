// middleware.ts (root proyek)
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Daftar rute publik
  const publicPaths = ['/login', '/register', '/'];

  // Izinkan rute publik tanpa autentikasi
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Ambil token dari cookie
  const token = req.cookies.get('token')?.value as any;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );

    const userRole = payload.role;

    // Logika peran untuk perlindungan rute
    if (pathname.startsWith('/event-management') && userRole !== 'organizer') {
      return NextResponse.redirect(new URL('/all-event', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/event-management/:path*', '/all-event', '/event/:path*'], // Mengatur matcher sesuai kebutuhan
};
