"use client"

import { FallbackProps } from "react-error-boundary"

import { Shell } from "@/shared/components/shells"

import { ErrorCard } from "."

interface FallbackComponentErrorCardProps extends FallbackProps {}

const FallbackComponentErrorCard = ({
  error,
  resetErrorBoundary,
}: FallbackComponentErrorCardProps) => {
  console.log(error)

  return (
    <Shell className="mt-8 max-w-2xl">
      <ErrorCard
        title="Что-то пошло не так..."
        description="Возможно, ваш запрос прервался, попробуйте повторить попытку, мы уже выяснеем, что произошло."
        reset={resetErrorBoundary}
      />
    </Shell>
  )
}

export default FallbackComponentErrorCard
