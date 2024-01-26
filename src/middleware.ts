import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/not-auth",
    "/signin(.*)",
    "/signup(.*)",
    "/verification(.*)",
    "/api/trpc(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      const url = new URL(req.nextUrl.origin)
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
