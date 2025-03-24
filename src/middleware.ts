import { jwtDecode } from 'jwt-decode';
import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  try {
    // Retrieve the token from cookies
    const token = request.cookies.get('authToken')?.value || '';
    const userInfo = request.cookies.get('userInfo')?.value || '';
    // If no token is found and not on login page, redirect to the home page
    if (pathName === '/login' && !token) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Decode the token and check its expiration
    const decoded = jwtDecode<{ exp: number }>(token);
    const isTokenValid = decoded.exp * 1000 > new Date().getTime();

    // If token is expired, redirect to home page
    if (!isTokenValid) {
      if (pathName === '/login') {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is on login page with a valid token, redirect to appropriate page based on their progress
    if (pathName === '/login' && isTokenValid) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    // Parse user info for tracking data
    let objectOfUserInfo;

    try {
      if (userInfo) {
        objectOfUserInfo = JSON.parse(userInfo);
      } else {
        objectOfUserInfo = {
          termsAccepted: false,
          onboardingCompleted: false,
          introductionViewed: false,
        };
      }
    } catch (error) {
      // If userInfo is invalid JSON, treat as if the user has not accepted terms
      console.error('Error parsing userInfo:', error);
      objectOfUserInfo = {
        termsAccepted: false,
        onboardingCompleted: false,
        introductionViewed: false,
      };
    }

    const isTermsAccepted = objectOfUserInfo?.termsAccepted === true;
    const isOnboardingCompleted =
      objectOfUserInfo?.onboardingCompleted === true;
    const isIntroductionViewed = objectOfUserInfo?.introductionViewed === true;

    // Handle the flow based on completion status

    // Step 1: If user tries to access any of the three onboarding pages after completing all steps
    if (isTermsAccepted && isOnboardingCompleted && isIntroductionViewed) {
      if (
        pathName === '/termsandconditon' ||
        pathName === '/onboarding' ||
        pathName === '/meet-teachers'
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Step 2: Terms and Conditions
    if (!isTermsAccepted) {
      // If user hasn't accepted terms, they should only access the terms page
      if (pathName !== '/termsandconditon' && pathName !== '/login') {
        return NextResponse.redirect(new URL('/termsandconditon', request.url));
      }
      return NextResponse.next();
    }

    // Step 3: Onboarding
    if (isTermsAccepted && !isOnboardingCompleted) {
      // If user has accepted terms but not completed onboarding, redirect to onboarding
      if (pathName !== '/onboarding' && pathName !== '/login') {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }
      return NextResponse.next();
    }

    // Step 4: Introduction/Meet Teachers
    if (isTermsAccepted && isOnboardingCompleted && !isIntroductionViewed) {
      // If user has completed onboarding but not viewed introduction, redirect to meet-teachers
      if (pathName !== '/meet-teachers' && pathName !== '/login') {
        return NextResponse.redirect(new URL('/meet-teachers', request.url));
      }
      return NextResponse.next();
    }

    // If all checks pass, allow access to the requested page
    return NextResponse.next();
  } catch (error) {
    // If there's an error (e.g., invalid token), redirect to the home page
    if (pathName === '/login') {
      return NextResponse.next();
    }
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/login',
    '/onboarding',
    '/meet-teachers',
    '/classroom',
    '/admin',
    '/termsandconditon',
    '/dashboard',
    '/report',
    '/pricing',
  ],
};
