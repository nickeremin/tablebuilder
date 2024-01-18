import React from "react"

import DesktopFooterNav from "../navs/desktop-footer-nav"
import MobileFooterNav from "../navs/mobile-footer-nav"

function SiteFooter() {
  return (
    <footer className="bg-background-100 shadow-border-t p-6 lg:p-10">
      <nav className="max-w-page mx-auto flex flex-col">
        <DesktopFooterNav />
        <MobileFooterNav />
      </nav>
    </footer>
  )
}

export default SiteFooter
