// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
















import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ---------- Route matchers ----------
const isAuthRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

const isFarmerRoute = createRouteMatcher([
  "/farmer(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/farmer(.*)",
  "/cart(.*)",
  "/orders(.*)",
  "/product(.*)",
  "/user(.*)",
]);

// ---------- Middleware ----------
export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // Allow auth pages
  if (isAuthRoute(req)) {
    return NextResponse.next();
  }

  // Block unauthenticated users from protected routes
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🧠 Extract role from Clerk metadata
  const role = sessionClaims?.metadata?.role as
    | "admin"
    | "farmer"
    | "buyer"
    | undefined;

  // 🚫 Admin routes → admin only
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚫 Farmer routes → farmer only
  if (isFarmerRoute(req) && role !== "farmer") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// ---------- Matcher ----------
export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};
