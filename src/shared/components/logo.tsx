import * as React from "react"

import { cn } from "@/shared/lib/utils"

export interface LogoIconProps extends React.HTMLAttributes<HTMLDivElement> {}

function LogoIcon({ className, ...props }: LogoIconProps) {
  return (
    <div
      className={cn(
        "relative h-8 w-8 rounded border-2 border-primary/75 bg-primary/10 dark:bg-primary/20",

        className
      )}
      {...props}
    >
      <div className="absolute left-0 top-[20%] w-full border-b-2 border-inherit" />
      <div className="absolute left-[20%] top-0 h-full border-r-2 border-inherit" />
    </div>
  )
}

export default LogoIcon
