"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { type UserResource } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { generateReactHelpers } from "@uploadthing/react/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { FileDropzone } from "@/features/upload"
import { Icons } from "@/shared/components/icons"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/shared/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import {
  Form,
  FormControl,
  FormItem,
  UncontrolledFormMessage,
} from "@/shared/components/ui/form"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { catchError, cn, isArrayOfFile, logAction } from "@/shared/lib/utils"
import { updateAccountSchema } from "@/shared/lib/validations/account"
import { type FileWithPreview } from "@/shared/types"
import { type OurFileRouter } from "@/app/api/uploadthing/core"

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

  // Control files wich store in dropzone
  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)
  const { isUploading, startUpload } = useUploadThing("profileImage")

  // Initialize react-hook-form with zod and set current user values
  const form = useForm<Inputs>({
    resolver: zodResolver(imageSchema),
  })

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
        <div className="relative border-b border-border p-6">
          <CardTitle className="text-xl">Аватар</CardTitle>
          <p className="my-3 text-sm/6">
            Это ваш аватар.
            <br />
            Нажмите на изображение, чтобы загрузить собственный аватар из ваших
            файлов.
          </p>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-6 top-6 h-20 w-20 rounded-full p-0"
            >
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.imageUrl} alt={user?.imageUrl} />
                <AvatarFallback>
                  <Skeleton className="h-full w-full rounded-full" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
        </div>
        <CardFooter className="min-h-[56px] justify-center bg-muted/30 py-3 md:justify-start">
          <p className="text-sm text-muted-foreground">
            Аватар не обязателен, но настоятельно рекомендуется.
          </p>
        </CardFooter>
      </Card>
      <DialogContent>
        <Form {...form}>
          <form
            className="grid items-center"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <h1 className="text-2xl font-semibold">Загрузите Аватар</h1>
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <FileDropzone
                  setValue={form.setValue}
                  name="image"
                  maxFiles={1}
                  maxSize={1024 * 1024 * 4}
                  files={files}
                  setFiles={setFiles}
                  isUploading={isUploading}
                  disabled={isPending}
                />
              </FormControl>
              <UncontrolledFormMessage
                message={form.formState.errors.image?.message}
              />
            </FormItem>
            <Button disabled={isPending} className="mt-6">
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Сохранить
              <span className="sr-only">Сохранить аватар</span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateImageForm
