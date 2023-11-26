import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { SearchPosts } from "@/features/search"
import { Shell } from "@/shared/components/shells/shell"
import { PageHeading } from "@/shared/components/ui/page-header"
import { cn } from "@/shared/lib/utils"

import productSupport from "/public/assets/product-support.png"

// TODO: Posts
const previewPosts = [
  {
    image: productSupport,
    title: "Первый пост",
    authors: ["Никита Еремин"],
    date: "03-11-2023",
    href: "/blog",
    rowSpan: "row-span-full",
  },
  {
    image: productSupport,
    title: "Второй пост",
    authors: ["Никита Еремин"],
    date: "03-11-2023",
    href: "/blog",
    rowSpan: "row-span-3",
  },
  {
    image: productSupport,
    title: "Третий пост",
    authors: ["Никита Еремин", "Никита Еремин"],
    date: "03-11-2023",
    href: "/blog",
    rowSpan: "row-span-4",
  },
  {
    image: productSupport,
    title: "Четвертый пост",
    authors: ["Никита Еремин", "Никита Ереминовичев", "Никита Еремин"],
    date: "03-11-2023",
    href: "/blog",
    rowSpan: "row-span-4",
  },
  {
    image: productSupport,
    title: "Пятый пост",
    authors: ["Никита Еремин"],
    date: "03-11-2023",
    href: "/blog",
    rowSpan: "row-span-3",
  },
] satisfies {
  image: StaticImageData
  title: string
  authors: string[]
  date: string
  href: string
  rowSpan: string
}[]

const allPosts = [
  {
    title:
      "Первый пост для проверки данной страницы, чтобы узнать максимальную длину",
    date: "03-11-2023",
  },
  {
    title: "Второй пост можно или нельзя как посмотреть",
    date: "24-11-2022",
  },
  {
    title: "Третий пост для подробной информации чего то там еще",
    date: "14-01-2022",
  },
  {
    title: "Четвертый пост так для ращнообразия",
    date: "23-07-2023",
  },
  {
    title: "Пятый пост искуственно добавляю длину чтобы оценить что по чем",
    date: "11-11-2022",
  },
  {
    title:
      "Шестой пост ага а тут у нас что, добавлю как я сюда еще больше текста а то мало ли что может еще",
    date: "30-10-2023",
  },
  {
    title: "Седьмой пост у многих данное число любимое",
    date: "18-10-2023",
  },
  {
    title: "Восьмой пост это как 2 в третьей степени",
    date: "23-09-2023",
  },
] satisfies {
  title: string
  date: string
}[]

function BlogPage() {
  return (
    <>
      <Shell className="px-4 lg:px-6">
        <div className="flex flex-col gap-8">
          <div className="mt-8 flex items-center justify-between lg:my-10">
            <PageHeading size="md" className="font-bold">
              Все посты
            </PageHeading>
            <SearchPosts />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:h-[600px] lg:grid-cols-3 lg:grid-rows-[repeat(7,minmax(0,1fr))]">
            {previewPosts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className={cn(
                  "group relative flex min-h-[210px] flex-col justify-end overflow-hidden rounded-lg border p-6 after:absolute after:inset-0 after:bg-dark-overlay after:transition-opacity after:content-[''] hover:after:opacity-75",
                  post.rowSpan
                )}
              >
                <Image
                  className="absolute inset-0 object-cover"
                  src={post.image}
                  alt={post.title}
                  fill
                />
                <div className="z-10 flex flex-col gap-3 text-white">
                  <p className="text-xl font-bold">{post.title}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm text-gray-400">
                      {post.authors.join(", ")}
                    </p>
                    <p className="shrink-0 text-sm text-gray-400">
                      {post.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="py-12 lg:py-16">
          <div className="flex flex-col gap-4 lg:gap-10">
            <PageHeading as="h2" size="xs" className="mb-2 font-bold">
              Последние
            </PageHeading>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {allPosts.map((post) => (
                <Link
                  key={post.title}
                  href="/blog"
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-xl font-semibold lg:text-2xl">
                    <Balancer>{post.title}</Balancer>
                  </h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </>
  )
}

export default BlogPage
