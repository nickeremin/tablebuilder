"use client"

import * as React from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { type Database } from "@/shared/types/supabase"

function UploadFileForm() {
  const supabase = createClientComponentClient<Database>()

  return <div>UploadFileForm</div>
}

export default UploadFileForm
