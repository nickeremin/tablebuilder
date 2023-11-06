import * as React from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

import { Button } from "@/shared/components/ui/button"

function SearchPosts() {
  return (
    <>
      <Button
        variant="outline"
        className="h-9 w-9 p-0 text-muted-foreground sm:h-10 sm:w-52 sm:justify-start sm:p-2"
      >
        <MagnifyingGlassIcon className="h-5 w-5 sm:mr-2" />
        <span className="hidden sm:inline-block">Поиск постов...</span>
      </Button>
    </>
  )
}

export default SearchPosts
