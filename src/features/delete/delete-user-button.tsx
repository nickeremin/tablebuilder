"use client"

import * as React from "react"
import { toast } from "sonner"

import { Icons } from "@/shared/components/icons"
import { ButtonProps, buttonVariants } from "@/shared/components/ui/button"
import { catchError, cn } from "@/shared/lib/utils"

interface DeleteUserButtonProps extends ButtonProps {
  userId: string
}

const DeleteUserButton = React.forwardRef<
  HTMLButtonElement,
  DeleteUserButtonProps
>(({ className, variant, size, userId, ...props }, ref) => {
  const [isPending, startTransition] = React.useTransition()

  return (
    <button
      disabled={isPending}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
      onClick={() => {
        startTransition(async () => {
          try {
            const response = await fetch("/api/auth/delete", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            })

            const result = await response.json()

            toast.message(result.userId)
          } catch (error) {
            catchError(error)
          }
        })
      }}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Удалить Аккаунт
    </button>
  )
})
DeleteUserButton.displayName = "DeleteUserButton"

export default DeleteUserButton
