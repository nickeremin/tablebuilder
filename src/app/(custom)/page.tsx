import * as React from "react"

import { HomeHeader, SiteFooter, StarsBackground } from "@/widgets/layout"
import {
  HomeImage,
  HomePreview,
  HomeTestimonials,
  HomeTimeline,
  HomeTrial,
} from "@/widgets/pages"

function HomePage() {
  return (
    <div>
      <div className="relative">
        <HomeHeader />
        <StarsBackground rotationX={45} rotationY={70} />
        <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center lg:gap-8">
          <HomePreview />
          <HomeImage />
        </div>
        <HomeTestimonials />
        <HomeTimeline />
      </div>
      <HomeTrial />
      <SiteFooter />
    </div>
  )
}

export default HomePage
