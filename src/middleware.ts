import { jwtDecode } from 'jwt-decode';
import { NextResponse, NextRequest } from 'next/server';

// Define constants for paths to avoid typos and improve maintainability
const PATHS = {
  LOGIN: '/login',
  ADMIN: '/admin',
  DASHBOARD: '/dashboard',
  TERMS: '/termsandconditon',
  ONBOARDING: '/onboarding',
  MEET_TEACHERS: '/meet-teachers',
};

// Helper functions to improve readability
const parseJSONSafely = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.log(`Parsing failed: ${error}`);
    return defaultValue;
  }
};

const isAdmin = (role: string | null | undefined): boolean => {
  if (!role) return false;

  return (
    role === 'admin' ||
    (typeof role === 'string' && role.trim().toLowerCase() === 'admin')
  );
};

const redirectTo = (request: NextRequest, path: string) => {
  return NextResponse.redirect(new URL(path, request.url));
};

export default function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  try {
    // Retrieve cookies
    const token = request.cookies.get('authToken')?.value || '';
    const userInfo = request.cookies.get('userInfo')?.value || '';
    const role = parseJSONSafely(request.cookies.get('role')?.value || '', '');

    // Handle no token cases
    if (pathName === PATHS.LOGIN && !token) {
      return NextResponse.next();
    }

    if (!token) {
      return redirectTo(request, PATHS.LOGIN);
    }

    // Validate token
    const decoded = jwtDecode<{ exp: number }>(token);
    const isTokenValid = decoded.exp * 1000 > Date.now();

    if (!isTokenValid) {
      return pathName === PATHS.LOGIN
        ? NextResponse.next()
        : redirectTo(request, PATHS.LOGIN);
    }

    // Admin role handling
    if (isAdmin(role)) {
      if (pathName === PATHS.ADMIN) {
        return NextResponse.next();
      }
      return redirectTo(request, PATHS.ADMIN);
    }

    // Non-admin trying to access admin page
    if (pathName === PATHS.ADMIN) {
      return redirectTo(request, PATHS.DASHBOARD);
    }

    // Logged-in user trying to access login page
    if (pathName === PATHS.LOGIN && isTokenValid) {
      return redirectTo(request, PATHS.ONBOARDING);
    }

    // User onboarding flow
    const userProgress = parseJSONSafely(userInfo, {
      termsAccepted: false,
      onboardingCompleted: false,
      introductionViewed: false,
    });

    const { termsAccepted, onboardingCompleted, introductionViewed } =
      userProgress;

    // All steps completed
    if (termsAccepted && onboardingCompleted && introductionViewed) {
      const onboardingPages = [
        PATHS.TERMS,
        PATHS.ONBOARDING,
        PATHS.MEET_TEACHERS,
      ];
      if (onboardingPages.includes(pathName)) {
        return redirectTo(request, PATHS.DASHBOARD);
      }
      return NextResponse.next();
    }

    // Step 1: Terms and Conditions
    if (
      !termsAccepted &&
      pathName !== PATHS.TERMS &&
      pathName !== PATHS.LOGIN
    ) {
      return redirectTo(request, PATHS.TERMS);
    }

    // Step 2: Onboarding
    if (
      termsAccepted &&
      !onboardingCompleted &&
      pathName !== PATHS.ONBOARDING &&
      pathName !== PATHS.LOGIN
    ) {
      return redirectTo(request, PATHS.ONBOARDING);
    }

    // Step 3: Meet Teachers
    if (
      termsAccepted &&
      onboardingCompleted &&
      !introductionViewed &&
      pathName !== PATHS.MEET_TEACHERS &&
      pathName !== PATHS.LOGIN
    ) {
      return redirectTo(request, PATHS.MEET_TEACHERS);
    }

    // If all checks pass
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return pathName === PATHS.LOGIN
      ? NextResponse.next()
      : redirectTo(request, PATHS.LOGIN);
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
