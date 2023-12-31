import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/(.*)",
    // "/signin(.*)",
    // "/signup(.*)",
    // "/sso-callback(.*)",
    // "/api/webhook(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/auth/signin"
      return NextResponse.redirect(url)
    }
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
