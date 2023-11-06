import * as React from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "@radix-ui/react-icons"

interface SignUpLayoutProps {
  children: React.ReactNode
}

function SignUpLayout({ children }: SignUpLayoutProps) {
  return (
    <main className="flex min-h-[85vh] flex-col justify-between px-6">
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center pt-28">
          {children}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-fit flex-col items-center gap-8 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Присоединяясь, вы соглашаетесь с{" "}
            <span>
              <Link
                aria-label="Перейти на страницу с условиями использования"
                href="/legal/terms"
                className="underline-link inline-flex items-center text-link"
              >
                условиями использования
                <ExternalLinkIcon className="ml-0.5 h-4 w-4" />
              </Link>
            </span>{" "}
            и{" "}
            <span>
              <Link
                aria-label="Перейти на страницу с политикой конфиденциальности"
                href="/legal/privacy-policy"
                className="underline-link inline-flex items-center text-link"
              >
                политикой конфиденциальности
                <ExternalLinkIcon className="ml-0.5 h-4 w-4" />
              </Link>
            </span>
          </p>
          <div className="w-[90%] border-b" />
          <p className="text-center text-sm text-muted-foreground">
            У вас сложный вариант использования в компании?{" "}
            <span>
              <Link
                aria-label="Перейти на страницу корпоративной помощи"
                href="/contact/sales"
                className="underline-link inline-flex items-center text-link"
              >
                Получите помощь корпоративного уровня
                <ExternalLinkIcon className="ml-0.5 h-4 w-4" />
              </Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default SignUpLayout
