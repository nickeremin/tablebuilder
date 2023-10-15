"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { type UserResource } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { Cropper, type ReactCropperElement } from "react-cropper"
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import "cropperjs/dist/cropper.css"

import { Icons } from "@/shared/components/icons"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/shared/components/ui/card"
import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import {
  Form,
  FormControl,
  FormItem,
  UncontrolledFormMessage,
} from "@/shared/components/ui/form"
import { Skeleton } from "@/shared/components/ui/skeleton"
import {
  catchError,
  cn,
  formatBytes,
  isArrayOfFile,
  logAction,
} from "@/shared/lib/utils"
import { updateAccountSchema } from "@/shared/lib/validations/account"
import { type FileWithPreview } from "@/shared/types"
import { trpc } from "@/app/_trpc/client"
import { type OurFileRouter } from "@/app/api/uploadthing/core"

const MAX_SIZE = 1024 * 1024 * 4
const MAX_FILES = 1

const imageSchema = updateAccountSchema.pick({ image: true })
type Inputs = z.infer<typeof imageSchema>

const { useUploadThing } = generateReactHelpers<OurFileRouter>()

interface UpdateImageFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function UpdateImageForm({ className, ...props }: UpdateImageFormProps) {
  const { user } = useUser()

  const { mutateAsync: updateImage } = useMutation({
    mutationFn: async ({ user, file }: { user: UserResource; file: File }) => {
      await user.setProfileImage({ file })
    },
  })

  const [isPending, startTransition] = React.useTransition()
  const [showUpdateImageDialog, setShowUpdateImageDialog] =
    React.useState(false)

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(imageSchema),
  })

  // Control files wich store in dropzone
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const { isUploading, startUpload } = useUploadThing("profileImage")

  function onDrop(
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[]
  ) {
    acceptedFiles.slice(acceptedFiles.length - MAX_FILES).forEach((file) => {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      setFiles((prev) => [
        ...(prev?.slice(prev.length - MAX_FILES + 1) ?? []),
        fileWithPreview,
      ])
    })

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ errors }) => {
        if (errors[0]?.code === "file-too-large") {
          toast.error(
            `Файл слишком большой. Максимальный размер ${formatBytes(
              MAX_SIZE
            )}.`
          )
          return
        }
        errors[0]?.message && toast.error(errors[0].message)
      })
    }

    setShowUpdateImageDialog(true)
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: MAX_FILES,
    multiple: false,
    maxSize: MAX_SIZE,
    disabled: isPending,
    accept: {
      "image/*": [],
    },
    onDrop,
  })

  const cropperRef = React.useRef<ReactCropperElement>(null)
  function onCrop() {
    const cropper = cropperRef.current?.cropper
    console.log(cropper?.getCroppedCanvas().toDataURL())
  }

  function onSubmit(input: Inputs) {
    // Check if user is loaded
    if (!user) return

    startTransition(async () => {
      try {
        // Check files to upload to Uploadthing storage
        isArrayOfFile(input.image)
          ? await startUpload(input.image).then((res) => {
              const formattedImages = res?.map((image) => ({
                id: image.key,
                name: image.key.split("_")[1] ?? image.key,
                url: image.url,
              }))
              return formattedImages ?? null
            })
          : null

        // Check files to update profile image
        if (isArrayOfFile(input.image)) {
          await updateImage({
            user,
            file: input.image[0]!,
          })

          // After update profile image, reset form values, close dialog and set dropzone files to null
          form.reset()
          setShowUpdateImageDialog(false)
          setFiles(null)

          logAction({
            toastMessasge: "Аватар обновлен.",
            status: "success",
          })
        }
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Dialog
      open={showUpdateImageDialog}
      onOpenChange={setShowUpdateImageDialog}
    >
      <Card
        as="section"
        className={cn("rounded-md border-none shadow-card-border", className)}
        {...props}
      >
        <div className="relative border-b p-6">
          {/* Avatar button which open file dialog when it pressed */}
          <div
            {...getRootProps({
              className:
                "relative flex float-right rounded-full hover:cursor-pointer ",
            })}
          >
            <input {...getInputProps()} />
            <Avatar className="h-20 w-20">
              <AvatarImage
                aria-label={user?.username ?? ""}
                src={user?.imageUrl}
                alt={user?.imageUrl}
                className="relative bg-transparent before:absolute before:bottom-0 before:left-0 before:z-50 before:h-28 before:w-28 before:bg-red-200 before:content-['']"
              />
              <AvatarFallback>
                <Skeleton className="h-full w-full rounded-full" />
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-xl">Аватар</CardTitle>
          <p className="my-3 text-sm/6">
            Это ваш аватар.
            <br />
            Нажмите на изображение, чтобы загрузить собственный аватар из ваших
            файлов.
          </p>
        </div>
        <CardFooter className="min-h-[56px] justify-center bg-muted/30 py-6 md:justify-start md:py-3">
          <p className="text-sm text-muted-foreground">
            Аватар не обязателен, но настоятельно рекомендуется.
          </p>
        </CardFooter>
      </Card>
      <DialogContent className="flex max-h-[min(800px,80vh)] flex-col p-0">
        <div className="overflow-y-auto overflow-x-hidden">
          <div className="relative overflow-y-auto overflow-x-hidden p-8">
            <Cropper
              ref={cropperRef}
              className="h-full object-cover"
              zoomTo={0.5}
              initialAspectRatio={1 / 1}
              src={user?.imageUrl}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          </div>
          <div className="sticky bottom-0 flex justify-between rounded-b-lg border-t bg-background p-4">
            <Button
              type="button"
              disabled={isPending}
              variant="outline"
              className="bg-background"
              onClick={() => setShowUpdateImageDialog(false)}
            >
              Отмена
              <span className="sr-only">Отменить изменение аватара</span>
            </Button>
            <Button disabled={isPending}>
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Сохранить
              <span className="sr-only">Сохранить аватар</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateImageForm
