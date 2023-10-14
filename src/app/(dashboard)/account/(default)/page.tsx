import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { AccountNav } from "@/widgets/layout/nav"
import {
  DeleteAccountrForm,
  UpdateEmailForm,
  UpdateImageForm,
  UpdateUsernameForm,
} from "@/features/forms/account"
import { getUserEmail } from "@/shared/lib/utils"

async function AccountPage() {
  const user = await currentUser()

  if (!user) return redirect("/auth/signin")

  return (
    <>
      <UpdateImageForm className="mb-8" />
      <UpdateUsernameForm className="mb-8" username={user.username ?? ""} />
      <UpdateEmailForm className="mb-8" email={getUserEmail(user)} />
      <DeleteAccountrForm
        className="mb-8"
        username={user.username ?? ""}
        deleteString="удалить мой личный аккаунт"
      />
    </>
  )
}

export default AccountPage
