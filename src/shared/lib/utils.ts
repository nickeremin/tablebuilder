import { isClerkAPIResponseError } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

import { TableColumn, TableColumnData } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(str: string) {
  return str.replace(
    /[\w\u0430-\u044f]+/gi,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )
}

export function getUserEmail(user: User | null) {
  return (
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""
  )
}

export function catchError(error: unknown) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (error instanceof Error) {
    return toast(error.message)
  } else {
    return toast("Something went wrong, please try again later.")
  }
}

export function catchClerkError(error: unknown) {
  const unknownError = "Something went wrong, please try again later."

  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (isClerkAPIResponseError(error)) {
    return toast.error(error.errors[0]?.longMessage ?? unknownError)
  } else {
    return toast.error(unknownError)
  }
}
