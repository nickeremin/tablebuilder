"use client"

import React from "react"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/shared/lib/utils"

const items = ["List Item", "List Item", "List Item", "List Item", "List Item"]

const liVariants: Variants = {
  closed: (index) => ({
    translateY: "-80px",
    visibility: "hidden",
    opacity: 0,
    transition: {
      translateY: {
        duration: 0.48 - 0.02 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
      opacity: {
        duration: 0.32 - 0.02 * index,
        delay: 0.15 - 0.03 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
      visibility: {
        delay: 0.47 - 0.05 * index,
      },
    },
  }),
  open: (index) => ({
    translateY: "0px",
    opacity: 1,
    visibility: "visible",
    transition: {
      translateY: {
        duration: 0.36 + 0.02 * index,
        ease: [0.32, 0.08, 0.24, 1],
      },
      opacity: {
        duration: 0.3 + 0.02 * index,
        delay: 0.03 + 0.03 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
    },
  }),
}

interface MobileMenuHeaderWrapperProps {
  isOpen: boolean
  backgroundColor: string
  scrollTop?: boolean
  className?: string
  children: React.ReactNode
}

function MobileMenuHeaderWrapper({
  isOpen,
  backgroundColor,
  scrollTop,
  className,
  children,
}: MobileMenuHeaderWrapperProps) {
  const containerVariants = React.useMemo(
    () =>
      ({
        closed: {
          background: backgroundColor,
          height: "64px",
          transition: {
            background: {
              duration: 0.44,
              delay: 0.2,
              ease: [0.52, 0.16, 0.24, 1],
            },
            height: {
              duration: 0.56,
              ease: [0.52, 0.16, 0.24, 1],
            },
          },
        },
        open: {
          background: "var(--gray-color-600-hsl)",
          height: "100vh",
          transition: {
            background: {
              duration: 0.36,
              ease: [0.32, 0.08, 0.24, 1],
            },
            height: {
              duration: 0.56,
              ease: [0.52, 0.16, 0.24, 1],
            },
          },
        },
      }) satisfies Variants,
    [backgroundColor]
  )

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen && scrollTop) {
      window.scrollTo({ top: 0 })
    }
  }, [isOpen, scrollTop])

  return (
    <motion.div
      variants={containerVariants}
      initial={"closed"}
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "shadow-border-b fixed inset-x-0 top-0 z-50 flex overflow-hidden",
        className
      )}
    >
      {children}
      <div className="absolute top-32 w-full px-6">
        <motion.ul className="flex flex-col">
          {items.map((item, i) => (
            <motion.li
              key={i}
              custom={i}
              variants={liVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
            >
              <Link href="/test" className="flex h-12 items-center border-b">
                {item} {i + 1}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default MobileMenuHeaderWrapper
