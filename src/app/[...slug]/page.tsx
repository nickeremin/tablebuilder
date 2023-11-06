import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/") ?? ""
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

async function Page({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) notFound()

  // Remove the /pages prefix from the slug
  const formattedPage = {
    ...page,
    slug: page.slug.replace(/^\/pages/, ""),
  }

  const formattedPages = allPages.map((page) => ({
    ...page,
    slug: page.slug.replace(/^\/pages/, ""),
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
      <div>{page.body.code}</div>
    </div>
  )
}

export default Page
