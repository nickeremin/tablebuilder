"use client"

import { toast } from "sonner"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shared/components/ui/dialog"

function CreateTeamForm() {
  return (
    <Dialog>
      {/* <DialogTrigger asChild> */}
      <Button
        onClick={() =>
          toast.error(
            "Нельзя создать команду. Данная функция еще в разработке."
          )
        }
        className="font-medium"
      >
        Создать команду
      </Button>
      {/* </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>Создать команду</DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTeamForm
