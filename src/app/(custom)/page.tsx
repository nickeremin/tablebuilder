import * as React from "react"

import { StarsBackground } from "@/widgets/layout"
import {
  HomeNav,
  HomePreview,
  PreviewImage,
  SiteFooter,
} from "@/widgets/layout/home"
import PreviewTestimonials from "@/widgets/layout/home/home-page/preview-testimonials"
import PreviewTimeline from "@/widgets/layout/home/home-page/preview-timeline"
import PreviewTour from "@/widgets/layout/home/home-page/preview-tour"

function HomePage() {
  return (
    <div>
      <div className="relative">
        <HomeNav />
        <StarsBackground rotationX={45} rotationY={70} />
        <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center lg:gap-8">
          <HomePreview />
          <PreviewImage />
        </div>
        <PreviewTestimonials />
        <PreviewTimeline />
      </div>
      <PreviewTour />
      <SiteFooter />
    </div>
  )
}

export default HomePage
