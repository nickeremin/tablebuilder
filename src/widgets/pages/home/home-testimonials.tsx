import React from "react"

import { Icons } from "@/shared/components/icons"
import { Shell } from "@/shared/components/shells/shell"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { testimonials, type Testimonial } from "@/shared/config/site/constants"

interface TestimonialCard {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCard) {
  return (
    <Card className="h-[280px] w-[520px] shadow-[0_3px_0_hsl(var(--border))]">
      <CardHeader>
        <CardTitle>{testimonial.name}</CardTitle>
        <CardDescription>{testimonial.text}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function HomeTestimonials() {
  return (
    <div className="my-16 lg:my-[180px] lg:mt-0">
      <Shell className="mb-8 lg:mb-16">
        <div className="flex flex-col items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex items-center">
              <Avatar className="relative z-10 h-14 w-14  lg:h-[72px] lg:w-[72px]">
                <AvatarImage
                  src="/assets/test-avatar.jpg"
                  className="object-cover grayscale"
                />
                <AvatarFallback>
                  <Skeleton className="h-full w-full rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="relative -ml-8 flex h-16 w-16 items-center justify-center bg-transparent lg:h-20 lg:w-20">
                <Icons.gitHub className="h-full w-full rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold lg:text-3xl">Никита Еремин</h3>
              <p className="text-xl lg:text-2xl ">Tablebuilder</p>
            </div>
          </div>
          <p className="max-w-[600px] text-center text-lg/8 font-medium text-secondary-foreground lg:text-xl/9">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, tempora harum. Dolore explicabo repellendus
            dignissimos itaque est natus quisquam hic esse adipisci totam,
            voluptatum velit incidunt non soluta fugit perferendis!
          </p>
        </div>
      </Shell>
      <ScrollArea className="w-full max-w-full" type="always">
        <div className="flex gap-4 py-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} />
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="[&_div]:min-w-24 h-4 min-w-[100px]"
        />
      </ScrollArea>
    </div>
  )
}

export default HomeTestimonials
