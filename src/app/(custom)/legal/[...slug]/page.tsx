import { notFound } from "next/navigation"
import { allLegalDocs } from "contentlayer/generated"

import "@/mdx/mdx.css"

import { Mdx } from "@/mdx/mdx-components"

import { HomeHeader, SiteFooter } from "@/widgets/layout"
import { Shell } from "@/shared/components/shells/shell"
import { PageHeading } from "@/shared/components/ui/page-header"
import { Spacer } from "@/shared/components/ui/spacer"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") ?? ""
  const doc = allLegalDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    null
  }

  return doc
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allLegalDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }))
}

async function Page({ params }: PageProps) {
  const doc = await getDocFromParams(params)

  if (!doc) notFound()

  // Remove the /pages prefix from the slug
  // const formattedPage = {
  //   ...doc,
  //   slug: doc.slug.replace(/^\/pages/, ""),
  // }

  // const formattedPages = allPages.map((page) => ({
  //   ...page,
  //   slug: page.slug.replace(/^\/pages/, ""),
  // }))

  return (
    <div>
      <div className="relative min-h-screen">
        <HomeHeader />
        <div className="flex flex-col items-center">
          <Spacer size="lg" className="sm:mt-[143px]" />
          {/* <h1 className="my-6 px-2 text-center text-[32px] font-bold leading-[1.05] tracking-tighter sm:text-[60px] md:text-[72px] lg:text-[80px]">
            {doc.title}
          </h1> */}
          <PageHeading
            size="xxl"
            className="my-6 px-2 text-center text-[32px] font-bold leading-[1.05] sm:text-[60px]"
          >
            {doc.title}
          </PageHeading>
          <Spacer size="lg" className="sm:mt-[143px]" />
        </div>
        <div className="flex flex-col bg-accent/40">
          <Spacer className="mt-[95px]" />
          <Shell as="div" className="flex flex-col items-center">
            <div className="w-full max-w-[900px]">
              <Mdx code={doc.body.code} />
            </div>
          </Shell>
          <Spacer className="mt-[95px]" />
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

export default Page
