"use client"

import { Icons } from "@/shared/components/icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface EmailAlertProps {
  isEmailVerified: boolean
}

const EmailAlert = ({ isEmailVerified }: EmailAlertProps) => {
  isEmailVerified = false

  return (
    <Alert
      className={cn(
        isEmailVerified
          ? "border-emerald-500/20 bg-emerald-50/50 dark:border-emerald-500/30 dark:bg-emerald-500/10"
          : "border-amber-500/20 bg-amber-50/50  dark:border-amber-500/30 dark:bg-amber-500/10"
      )}
    >
      {isEmailVerified ? (
        <Icons.emailVerified className="h-4 w-4 fill-emerald-300 dark:fill-emerald-500/80" />
      ) : (
        <Icons.emailNotVerified className="h-4 w-4 fill-amber-300/60 dark:fill-amber-500/60" />
      )}
      <AlertTitle
        className={cn(
          isEmailVerified
            ? "text-emerald-900 dark:text-emerald-100"
            : "text-amber-900 dark:text-amber-100"
        )}
      >
        {isEmailVerified ? "Почта подтверждена!" : "Почта на подтверждена!"}
      </AlertTitle>
      <AlertDescription
        className={cn(
          "flex flex-col gap-2",
          isEmailVerified
            ? " text-emerald-900 dark:text-emerald-200"
            : "text-amber-900 dark:text-amber-200"
        )}
      >
        {isEmailVerified ? (
          <p>
            Ваша почта успешно подтверждена, теперь мы можете создавать таблицы
            и добавлять в них записи.
          </p>
        ) : (
          <p>
            Подтвердите почту, чтобы открыть возможность создавать таблицы и
            добавлять в них записи.
          </p>
        )}
        {!isEmailVerified && (
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "text-amber-900 hover:text-amber-900 dark:text-amber-100 hover:dark:text-amber-100 sm:self-end"
            )}
          >
            Отправить подтверждение
            <Icons.send className="ml-2 h-4 w-4" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

export default EmailAlert
