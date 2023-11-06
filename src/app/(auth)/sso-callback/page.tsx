import { type HandleOAuthCallbackParams } from "@clerk/types"

import { SSOCallback } from "@/entities/loading"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

function SSOCallbackPage({ searchParams }: SSOCallbackPageProps) {
  return (
    <div className="flex h-[calc(100vh-160px)] flex-col items-center justify-center px-6">
      <SSOCallback searchParams={searchParams} />
    </div>
  )
}

export default SSOCallbackPage
