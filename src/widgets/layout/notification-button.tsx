"use client"

import { BellIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"

function NotificationButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Открыть Ваши уведомления"
          variant="outline"
          size="icon"
          className="rounded-full text-primary/80"
        >
          <BellIcon className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent></PopoverContent>
    </Popover>
  )
}

export default NotificationButton
