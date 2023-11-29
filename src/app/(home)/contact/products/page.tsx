"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpenIcon } from "lucide-react"

import { Icons } from "@/shared/components/icons"
import LogoIcon from "@/shared/components/logo"
import { Shell } from "@/shared/components/shells/shell"
import { buttonVariants } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { PageHeading } from "@/shared/components/ui/page-header"
import { cn } from "@/shared/lib/utils"

function ContactProductsPage() {
  const shellRef = React.useRef<HTMLDivElement | null>(null)
  const iconRef = React.useRef<HTMLDivElement | null>(null)
  const imageRef = React.useRef<HTMLDivElement | null>(null)

  const positionRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  })

  React.useEffect(() => {
    if (!shellRef.current || !imageRef.current || !iconRef.current) return

    const { left: shellLeft, top: shellTop } =
      shellRef.current.getBoundingClientRect()

    const {
      left: iconLeft,
      top: iconTop,
      right: iconRight,
      bottom: iconBottom,
    } = iconRef.current.getBoundingClientRect()

    const centerX = (iconRight + iconLeft) / 2 - shellLeft - 64
    const centerY = (iconTop + iconBottom) / 2 - shellTop - 52

    positionRef.current.mouseX = centerX
    positionRef.current.mouseY = centerY

    imageRef.current.style.opacity = "1"
  }, [])

  React.useEffect(() => {
    const ref = shellRef.current

    const updateMousePosition = (e: MouseEvent) => {
      if (!ref || !imageRef.current) return

      const { clientX, clientY } = e

      const { left, top } = ref.getBoundingClientRect()

      positionRef.current.mouseX = clientX - left - 64
      positionRef.current.mouseY = clientY - top - 52
    }

    ref?.addEventListener("mousemove", updateMousePosition)

    return () => {
      ref?.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  React.useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse)
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current

      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX
        positionRef.current.destinationY = mouseY
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX
          positionRef.current.destinationY = mouseY
        } else {
          positionRef.current.destinationX += distanceX
          positionRef.current.destinationY += distanceY
        }
      }

      if (imageRef.current)
        imageRef.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`
    }
    followMouse()
  }, [])

  return (
    <>
      <Shell
        ref={shellRef}
        as="section"
        className={cn(
          "relative overflow-hidden rounded-lg bg-accent-1 px-0 lg:mt-24",
          "before:absolute before:inset-0 before:z-10  before:backdrop-blur-xl before:content-['']"
        )}
      >
        {/* Image following cursor */}
        <div
          ref={imageRef}
          className="contact-products-support-image transition-opacity duration-300 will-change-transform"
        />

        <div className="relative z-10 px-4 py-24 lg:px-6">
          <div className="flex flex-col items-center gap-6">
            <div
              ref={iconRef}
              className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#090909] text-[#fff]"
            >
              <BookOpenIcon strokeWidth={1.5} className="h-7 w-7" />
            </div>
            <div className="flex flex-col gap-4">
              <PageHeading size="sm" className="text-center font-bold">
                Как мы можем вам помочь?
              </PageHeading>
              <p className="max-w-[500px] text-center text-lg text-muted-foreground lg:text-2xl">
                Найдите решения с помощью наших{" "}
                <Link href="/guides" className="text-foreground">
                  руководств
                </Link>{" "}
                и{" "}
                <Link href="#community" className="text-foreground">
                  сообщества
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Shell>
      <Shell as="section" className="mt-20 pb-20 lg:mt-32 lg:pb-32">
        <div
          id="community"
          className="flex scroll-mt-16 flex-col items-center gap-12"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-foreground text-background">
              <LogoIcon className="h-7 w-7 border-background" />
            </div>
            <div>
              <p className="text-center text-xl text-muted-foreground">
                Если вы не ответили на свои вопросы самостоятельно
              </p>
              <h2 className="text-center text-2xl font-semibold lg:text-3xl">
                Воспользуйтесь нашей оффициальной поддержкой.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* GitHub community */}
            <Card className="mx-auto flex max-w-[520px] flex-col">
              <CardHeader className="border-b">
                <CardTitle>Сообщество Tablebuilder</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-secondary-foreground">
                  Создайте обсуждение и получите помощь от других пользователей.
                </p>
              </CardContent>
              <CardFooter className="mt-auto flex-col items-center">
                <Link
                  href="/contact/products"
                  className={cn(
                    buttonVariants({
                      size: "xl",
                      variant: "outline",
                      className: "w-full",
                    })
                  )}
                >
                  <Icons.gitHub className="h-8 w-8 pr-2" />
                  Перейти на GitHub
                </Link>
              </CardFooter>
            </Card>

            {/* Customer support */}
            <Card className="mx-auto flex max-w-[520px] flex-col">
              <CardHeader className="border-b">
                <CardTitle>Служба поддержки Tablebuilder</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-secondary-foreground">
                  Войдите в систему и отправьте заявку прямо из нашей формы
                  поддержки.
                </p>
              </CardContent>
              <CardFooter className="mt-auto flex-col items-center">
                <Link
                  href="/contact/products"
                  className={cn(
                    buttonVariants({
                      size: "xl",
                      className: "w-full",
                    })
                  )}
                >
                  Войти
                </Link>
              </CardFooter>
            </Card>

            {/* Guides support */}
            <Card className="mx-auto flex max-w-[520px] flex-col">
              <CardHeader className="border-b">
                <CardTitle>Руководства Tablebuilder</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-secondary-foreground">
                  Получите помощь посмотрев подробные руководства по ползованию
                  нашимт продуктами.
                </p>
              </CardContent>
              <CardFooter className="mt-auto flex-col items-center">
                <Link
                  href="/contact/products"
                  className={cn(
                    buttonVariants({
                      size: "xl",
                      variant: "outline",
                      className: "w-full",
                    })
                  )}
                >
                  Перейти в Руководства
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Shell>
    </>
  )
}

export default ContactProductsPage
