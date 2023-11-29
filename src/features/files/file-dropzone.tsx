"use client"

import * as React from "react"
import { UploadIcon } from "@radix-ui/react-icons"
import {
  useDropzone,
  type Accept,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone"
import {
  UseFormSetValue,
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form"
import { Balancer } from "react-wrap-balancer"
import { toast } from "sonner"

import { FileCard } from "@/entities/cards"
import { cn, formatBytes } from "@/shared/lib/utils"
import { type FileWithPreview } from "@/shared/types"

interface FileDropzoneProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName
  setValue: UseFormSetValue<TFieldValues>
  accept?: Accept
  maxSize?: number
  maxFiles?: number
  files: FileWithPreview[] | null
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>
  isUploading?: boolean
  disabled?: boolean
}

function FileDropzone<TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/*": [],
  },
  maxSize = 1024 * 1024 * 2,
  maxFiles = 1,
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  className,
  ...props
}: FileDropzoneProps<TFieldValues>) {
  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.slice(acceptedFiles.length - maxFiles).forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
        setFiles((prev) => [
          ...(prev?.slice(prev.length - maxFiles + 1) ?? []),
          fileWithPreview,
        ])
      })

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `Файл слишком большой. Максимальный размер ${formatBytes(
                maxSize
              )}.`
            )
            return
          }
          errors[0]?.message && toast.error(errors[0].message)
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxSize, maxFiles]
  )

  // Register files to react-hook-form
  React.useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    disabled,
  })

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={cn(
          "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive && "border-muted-foreground/50",
          disabled && "pointer-events-none opacity-60",
          className
        )}
        {...props}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="group grid w-full place-items-center gap-1 sm:px-10">
            <UploadIcon
              className="h-9 w-9 animate-pulse text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        ) : isDragActive ? (
          <div className="grid place-items-center gap-2 text-muted-foreground sm:px-5">
            <UploadIcon
              className={cn("h-8 w-8", isDragActive && "animate-bounce")}
              aria-hidden="true"
            />
            <p className="text-base font-medium">Перекиньте файл сюда</p>
          </div>
        ) : (
          <div className="grid place-items-center space-y-2 sm:px-5">
            <UploadIcon
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="space-y-5">
              <p className="mt-2 text-base font-medium text-muted-foreground">
                <Balancer>
                  Перетащите файл сюда или щелкните, чтобы выбрать файл.
                </Balancer>
              </p>
              <p className="text-sm text-slate-500">
                <Balancer>
                  Пожалуйста, загрузите файл размером меньше{" "}
                  {formatBytes(maxSize)}.
                </Balancer>
              </p>
            </div>
          </div>
        )}
      </div>
      {files?.length ? (
        <div className="grid gap-5">
          {files?.map((file, i) => (
            <FileCard
              key={i}
              i={i}
              files={files}
              setFiles={setFiles}
              file={file}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FileDropzone
