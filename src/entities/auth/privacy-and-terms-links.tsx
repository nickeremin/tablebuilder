import React from "react"
import Link from "next/link"

import { LucideIcon } from "@/shared/components/icons"

function PrivacyAndTermsLinks() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-fit flex-col items-center gap-8 py-8">
        <p className="text-center text-sm text-tertiary">
          Присоединяясь, вы соглашаетесь с{" "}
          <span>
            <Link
              href="/legal/terms"
              className="underline-link inline-flex items-center gap-0.5 text-link"
            >
              условиями использования
              <LucideIcon name="ExternalLink" className="size-4" />
            </Link>
          </span>{" "}
          и{" "}
          <span>
            <Link
              href="/legal/privacy-policy"
              className="underline-link inline-flex items-center gap-0.5 text-link"
            >
              политикой конфиденциальности
              <LucideIcon name="ExternalLink" className="size-4" />
            </Link>
          </span>
        </p>
        <div className="w-[90%] border-b" />
        <p className="text-center text-sm text-tertiary">
          У вас сложныe требования в компании?{" "}
          <span>
            <Link
              href="/contact/sales"
              className="underline-link inline-flex items-center gap-0.5 text-link"
            >
              Получите помощь корпоративного уровня
              <LucideIcon name="ExternalLink" className="size-4" />
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default PrivacyAndTermsLinks
