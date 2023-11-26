import * as React from "react"

import "./globals.css"

import { type Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "@/shared/components/ui/toaster"
import { ThemeProvider, TRPCQueryProvider } from "@/shared/config/providers"
import { cn } from "@/shared/lib/utils"

export const metadata: Metadata = {
  title: "Create Next App",
}

// const notoSans = Noto_Sans({
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["cyrillic", "latin"],
//   style: "normal",
// })

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic", "latin"],
  style: "normal",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(inter.className, "antialiased")}
      >
        <body
          suppressHydrationWarning
          className="relative min-h-full max-w-[100vw]"
        >
          <TRPCQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </TRPCQueryProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
