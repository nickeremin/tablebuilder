"use client"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

function CreateTeamForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-medium">Создать команду</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Создать команду</DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTeamForm
