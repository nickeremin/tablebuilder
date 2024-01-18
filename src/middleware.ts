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
    return NextResponse.next()
    //console.log(req.nextUrl)

    // if (auth.isApiRoute) {
    //   console.log({
    //     apiRoute: req.nextUrl.pathname,
    //   })
    // }

    // if (auth.isPublicRoute || auth.isApiRoute) {
    //   //  For public routes, we don't need to do anything
    //   return NextResponse.next()
    // }

    // if (!auth.userId) {
    //   //  If user tries to access a private route without being authenticated,
    //   //  redirect them to the sign in page
    //   const url = new URL(req.nextUrl.origin)
    //   url.pathname = "/auth/signin"
    //   return NextResponse.redirect(url)
    // }
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
