import { jwtDecode } from 'jwt-decode';
import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  try {
    // Retrieve the token from cookies

    const token = request.cookies.get('authToken')?.value || '';
    // If no token is found, redirect to the home page

    if (pathName === '/login' && !token) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // Decode the token and check its expiration
    const decoded = jwtDecode<{ exp: number }>(token);

    if (pathName === '/login' && token) {
      if (decoded.exp * 1000 > new Date().getTime()) {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      // If the token is valid, proceed with the request
      if (decoded.exp * 1000 > new Date().getTime()) {
        return NextResponse.next();
      } else {
        // If the token is expired, redirect to the home page
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If there's an error (e.g., invalid token), redirect to the home page

    if (pathName === '/login') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/login', '/onboarding', '/meet-teachers', '/classroom'],
};
