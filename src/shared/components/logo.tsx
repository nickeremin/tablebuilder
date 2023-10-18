import * as React from "react"

import { themeVariants } from "@/shared/config/site/themes"
import { cn } from "@/shared/lib/utils"

interface LogoIconProps extends React.HTMLAttributes<HTMLDivElement> {}

function LogoIcon({ className, ...props }: LogoIconProps) {
  return (
    <div
      className={cn(
        "border-primary-blue dark:bg-primary-blue/20 bg-primary-blue/10 relative h-8 w-8 rounded border-2",

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
