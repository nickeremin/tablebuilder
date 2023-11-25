"use client"

import { motion } from "framer-motion"
import { Drawer } from "vaul"

function CustomPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center gap-1 rounded-xl border p-6 text-[48px] font-bold">
        <span className="relative block select-none before:absolute before:inset-0 before:z-0 before:w-full before:bg-[linear-gradient(180deg,rgba(0,0,0,.8),#000)] before:bg-clip-text before:text-transparent before:content-['Hello.']">
          <span className="animated-gradient-text-fade-blue relative z-10 block bg-[linear-gradient(90deg,#007cf0,#00dfd8)] bg-clip-text text-transparent">
            Hello.
          </span>
        </span>
        <span className="relative block select-none before:absolute before:inset-0 before:z-0 before:w-full before:bg-[linear-gradient(180deg,rgba(0,0,0,.8),#000)] before:bg-clip-text before:text-transparent before:content-['Pretty.']">
          <span className="animated-gradient-text-fade-purple relative z-10 block bg-[linear-gradient(90deg,#7928ca,#ff0080)] bg-clip-text text-transparent">
            Pretty.
          </span>
        </span>
        <span className="relative block select-none before:absolute before:inset-0 before:z-0 before:w-full before:bg-[linear-gradient(180deg,rgba(0,0,0,.8),#000)] before:bg-clip-text before:text-transparent before:content-['World.']">
          <span className="animated-gradient-text-fade-orange relative z-10 block bg-[linear-gradient(90deg,#ff4d4d,#f9cb28)] bg-clip-text text-transparent">
            World.
          </span>
        </span>
      </div>
    </div>
  )
}

export default CustomPage
