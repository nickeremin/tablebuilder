import * as React from "react"
import Image from "next/image"
import { Cross2Icon } from "@radix-ui/react-icons"

import { Button } from "@/shared/components/ui/button"
import { FileWithPreview } from "@/shared/types"

interface FileCardProps {
  i: number
  file: FileWithPreview
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
}

function FileCard({ i, file, files, setFiles }: FileCardProps) {
  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Image
          src={file.preview}
          alt={file.name}
          className="h-10 w-10 shrink-0 rounded-md"
          width={40}
          height={40}
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            if (!files) return
            setFiles(files.filter((_, j) => j !== i))
          }}
        >
          <Cross2Icon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Удалить файл</span>
        </Button>
      </div>
    </div>
  )
}

export default FileCard
