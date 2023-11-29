"use client"

import * as React from "react"
import Link from "next/link"

import { ContactSalesSupportForm } from "@/features/forms"
import { Shell } from "@/shared/components/shells/shell"
import { PageHeading } from "@/shared/components/ui/page-header"

function ContactSalesPage() {
  const shellRef = React.useRef<HTMLDivElement | null>(null)
  const formRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const ref = shellRef.current

    const updateMousePosition = (e: MouseEvent) => {
      if (!formRef.current) return

      const rect = formRef.current.getBoundingClientRect()
      const { left, top, right, bottom } = rect

      const centerX = (right + left) / 2
      const centerY = (top + bottom) / 2

      const { clientX, clientY } = e

      const deltaX = clientX - centerX
      const deltaY = clientY - centerY

      const angle = Math.atan2(deltaY, deltaX)

      ref?.style.setProperty(
        "--contact-gradient-rotation",
        `${angle - Math.PI / 2}rad`
      )
    }

    ref?.addEventListener("mousemove", updateMousePosition)

    return () => {
      ref?.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <div
      ref={shellRef}
      className="contact-sales-support-shell min-h-[calc(100vh-64px)] w-full"
    >
      <Shell className="flex flex-col items-center px-4 pb-20 lg:px-6">
        <PageHeading size="lg" className="mt-12 text-center font-bold lg:mt-16">
          Свяжитесь с нашим Отделом Продаж
        </PageHeading>
        <p className="mb-12 mt-3 text-center text-lg text-muted-foreground lg:text-2xl">
          Мы поможем вам подобрать подходящий план для ваших требований.
        </p>
        <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:items-baseline lg:gap-8">
          <div className="flex max-w-md flex-1 flex-col items-center">
            <div
              ref={formRef}
              className="contact-sales-support-form relative w-full overflow-hidden rounded-xl p-6 shadow-[0_-3px_5px_-1px_var(--accent-2)] dark:shadow-[0_-2px_3px_-1px_var(--accent-2)]"
            >
              <ContactSalesSupportForm />
            </div>

            <p className="pt-8 text-center text-sm text-muted-foreground">
              Отправляя эту форму, я подтверждаю, что прочитал и понял{" "}
              <Link
                href="/legal/privacy-policy"
                className="text-link hover:underline hover:underline-offset-4"
              >
                Политику Конфиденциальности
              </Link>{" "}
              Tablebuilder.
            </p>
          </div>
          <div className="flex max-w-md flex-1 flex-col gap-8 pt-12 lg:gap-12 lg:pl-16">
            <div className="-mx-4 flex flex-col gap-6 border-b px-4 pb-8 lg:mx-0 lg:px-0 lg:pb-12">
              <blockquote>
                <p className="text-xl text-secondary-foreground">
                  &quot;Lorem ipsum dolor sit amet consectetur, adipisicing
                  elit. Dolor esse hic repellat officia eum harum? Excepturi
                  mollitia perferendis voluptatum maiores commodi, quis vitae!
                  Odit, molestias numquam sequi saepe dolorem velit?&quot;
                </p>
              </blockquote>
              <span className="text-xl font-bold">Tablebuilder</span>
            </div>
            <p className="text-center text-sm font-semibold uppercase text-muted-foreground">
              Наша поддержка найдет решение самых сложных&nbsp;задач
            </p>
          </div>
        </div>
      </Shell>
    </div>
  )
}

export default ContactSalesPage
