import Link from "next/link"

import { Icons } from "@/shared/components/icons"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { cn } from "@/shared/lib/utils"

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: keyof typeof Icons
  title: string
  description: string
  retryLink?: string
  retryLinkText?: string
  reset?: () => void
}

const ErrorCard = ({
  icon,
  title,
  description,
  retryLink,
  retryLinkText = "Вернуться назад",
  reset,
  className,
  ...props
}: ErrorCardProps) => {
  const Icon = Icons[icon || "warning"]

  return (
    <Card
      as="section"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn("grid w-full place-items-center", className)}
      {...props}
    >
      <CardHeader>
        <div className="grid h-20 w-20 place-items-center rounded-full bg-muted">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[176px] flex-col items-center justify-center space-y-2.5 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-4">
          {description}
        </CardDescription>
      </CardContent>
      {retryLink ? (
        <CardFooter>
          <Link
            href={retryLink}
            className={cn(
              buttonVariants({
                variant: "ghost",
              })
            )}
          >
            {retryLinkText}
            <span className="sr-only">{retryLinkText}</span>
          </Link>
        </CardFooter>
      ) : null}
      {reset ? (
        <CardFooter>
          <Button aria-label="Retry" variant="ghost" onClick={reset}>
            Повторить попытку
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}

export default ErrorCard
