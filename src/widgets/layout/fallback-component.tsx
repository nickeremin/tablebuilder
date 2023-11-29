"use client"

import { FallbackProps } from "react-error-boundary"

import { ErrorCard } from "@/entities/cards"
import { Shell } from "@/shared/components/shells/shell"

interface FallbackComponentProps extends FallbackProps {}

const FallbackComponent = ({
  error,
  resetErrorBoundary,
}: FallbackComponentProps) => {
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

export default FallbackComponent
