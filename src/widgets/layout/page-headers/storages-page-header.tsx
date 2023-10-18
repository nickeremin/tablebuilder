import React from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "@radix-ui/react-icons"

import { CreateNewStorageForm } from "@/features/forms/storage"
import { Shell } from "@/shared/components/shells/shell"

function StoragesPageHeader() {
  return (
    <header className="w-full border-b border-border">
      <Shell as="div">
        <div className="relative flex flex-1 flex-col">
          <div className="my-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="text-3xl/10 font-medium">Xранилище</h1>
              <p className="text-sm text-muted-foreground">
                Создавайте личные хранилища для хранения ваших документов.{" "}
                <Link
                  href="/storages"
                  className="text-link hover:after:border-b-link relative inline-flex items-center hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:border-b hover:after:content-['']"
                >
                  Узнать больше
                  <ExternalLinkIcon
                    className="ml-0.5 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </p>
            </div>
            <CreateNewStorageForm />
          </div>
        </div>
      </Shell>
    </header>
  )
}

export default StoragesPageHeader
