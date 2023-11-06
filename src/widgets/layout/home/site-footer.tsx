import * as React from "react"

import DesktopFooterNav from "./desktop-footer-nav"
import MobileFooterNav from "./mobile-footer-nav"

function SiteFooter() {
  return (
    <footer className="border-t p-6 dark:bg-accent/20 lg:py-12">
      <nav className="mx-auto flex max-w-page flex-col">
        <DesktopFooterNav />
        <MobileFooterNav />
      </nav>
    </footer>
  )
}

export default SiteFooter
