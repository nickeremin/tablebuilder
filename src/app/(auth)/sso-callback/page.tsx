import { type HandleOAuthCallbackParams } from "@clerk/types"

import { SSOCallback } from "@/entities/loading"
import { Shell } from "@/shared/components/shells/shell"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

function SSOCallbackPage({ searchParams }: SSOCallbackPageProps) {
  return (
    <Shell className="min-h-[calc(100vh-64px)] py-6">
      <SSOCallback searchParams={searchParams} />
    </Shell>
  )
}

export default SSOCallbackPage
