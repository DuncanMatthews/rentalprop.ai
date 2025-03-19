import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./utils/supabase/server";

export async function middleware(request: NextRequest) {
  // First, update the Supabase session



  // Check if the path starts with /dashboard
  const url = new URL(request.url);
  const isDashboardPath = url.pathname.startsWith("/dashboard");
  const supabase = createClient();

  if (isDashboardPath) {
    // Get the auth cookie to check if user is logged in
    const { data } = await (await supabase).auth.getSession();
  
    // If no session exists, redirect to login
    if (!data.session) {
      const redirectUrl = new URL("/auth/login", request.url);
      // Add a return URL parameter so the user can be redirected back after login
      redirectUrl.searchParams.set("returnUrl", url.pathname);
  
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
