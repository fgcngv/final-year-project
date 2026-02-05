// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };
















// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // ---------- Route matchers ----------
// const isAuthRoute = createRouteMatcher([
//   "/sign-in(.*)",
//   "/sign-up(.*)",
// ]);

// const isAdminRoute = createRouteMatcher([
//   "/admin(.*)",
// ]);

// const isFarmerRoute = createRouteMatcher([
//   "/farmer(.*)",
// ]);

// const isProtectedRoute = createRouteMatcher([
//   "/admin(.*)",
//   "/farmer(.*)",
//   "/cart(.*)",
//   "/orders(.*)",
//   "/product(.*)",
//   "/user(.*)",
//   "/notifications(.*)",
// ]);

// // ---------- Middleware ----------
// export default clerkMiddleware(async (auth, req) => {
//   const { userId, sessionClaims } = await auth();

//   // Allow auth pages
//   if (isAuthRoute(req)) {
//     return NextResponse.next();
//   }

//   // Block unauthenticated users from protected routes
//   if (!userId && isProtectedRoute(req)) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   // 🧠 Extract role from Clerk metadata
//   const role = sessionClaims?.metadata?.role as
//     | "admin"
//     | "farmer"
//     | "buyer"
//     | undefined;

//   // 🚫 Admin routes → admin only
//   if (isAdminRoute(req) && role !== "admin") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // 🚫 Farmer routes → farmer only
//   if (isFarmerRoute(req) && role !== "farmer") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// });

// // ---------- Matcher ----------
// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)",
//   ],
// };










// new 

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

// ---------- next-intl middleware ----------
const intlMiddleware = createIntlMiddleware(routing);

// ---------- Route matchers (locale-aware) ----------
const isAuthRoute = createRouteMatcher([
  "/(en|am|om)?/sign-in(.*)",
  "/(en|am|om)?/sign-up(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/(en|am|om)?/admin(.*)",
]);

const isFarmerRoute = createRouteMatcher([
  "/(en|am|om)?/farmer(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/(en|am|om)?/admin(.*)",
  "/(en|am|om)?/farmer(.*)",
  "/(en|am|om)?/cart(.*)",
  "/(en|am|om)?/orders(.*)",
  "/(en|am|om)?/product(.*)",
  "/(en|am|om)?/user(.*)",
  "/(en|am|om)?/notifications(.*)",
]);

// ---------- Middleware ----------
// export default clerkMiddleware(async (auth, req) => {
//   // Run next-intl FIRST
//   const intlResponse = intlMiddleware(req);
//   if (intlResponse) return intlResponse;

//   const { userId, sessionClaims } = await auth();

//   // Allow auth pages
//   if (isAuthRoute(req)) {
//     return NextResponse.next();
//   }

//   // Block unauthenticated users
//   if (!userId && isProtectedRoute(req)) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   // Role from Clerk
//   const role = sessionClaims?.metadata?.role as
//     | "admin"
//     | "farmer"
//     | "buyer"
//     | undefined;

//   // Admin only
//   if (isAdminRoute(req) && role !== "admin") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // Farmer only
//   if (isFarmerRoute(req) && role !== "farmer") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// });

export default clerkMiddleware(async (auth, req) => {
  // Run next-intl
  const intlResponse = intlMiddleware(req);

  // 🔴 CRITICAL FIX:
  // Only return if next-intl actually changed something
  if (intlResponse?.headers.get("location")) {
    return intlResponse;
  }

  const { userId, sessionClaims } = await auth();

  // Allow auth pages
  if (isAuthRoute(req)) {
    return NextResponse.next();
  }

  // Protected routes
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const role = sessionClaims?.metadata?.role as
    | "admin"
    | "farmer"
    | "buyer"
    | undefined;

  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isFarmerRoute(req) && role !== "farmer") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});


// ---------- Matcher ----------
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
