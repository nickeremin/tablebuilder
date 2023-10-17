import { Suspense } from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { ErrorBoundary } from "react-error-boundary"

import {
  DeleteAccountrForm,
  UpdateEmailForm,
  UpdateImageForm,
  UpdateUsernameForm,
} from "@/features/forms/account"
import { FallbackComponentErrorCard } from "@/entities/cards/error"

async function AccountPage() {
  const user = await currentUser()

  if (!user) return redirect("/auth/signin")

  return (
    <>
      <ErrorBoundary FallbackComponent={FallbackComponentErrorCard}>
        <Suspense fallback={<p>Loading...</p>}>
          <UpdateImageForm className="mb-8" />
          <UpdateUsernameForm className="mb-8" />
          <UpdateEmailForm className="mb-8" />
          <DeleteAccountrForm className="mb-8" />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default AccountPage
