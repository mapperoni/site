import Image from "next/image";
import Link from "next/link";

import { Prose } from "@/components/Prose";
import { type BlogFrontmatter, formatBlogDate } from "@/lib/blog";

function PostDate({ date }: { date: string }) {
  return <time dateTime={date}>{formatBlogDate(date)}</time>;
}

export function BlogPost({
  children,
  frontmatter,
}: {
  children: React.ReactNode;
  frontmatter: BlogFrontmatter;
}) {
  const wasUpdated = frontmatter.updatedAt !== frontmatter.publishedAt;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <article>
        <header className="border-b border-slate-200 pb-10 sm:pb-12">
          {frontmatter.image && (
            <Link
              href="/blog"
              aria-label="Mapperoni blog"
              className="inline-block"
            >
              <span className="relative block h-32 w-56 sm:h-36">
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.imageAlt ?? ""}
                  fill
                  sizes="224px"
                  className="object-contain object-left"
                />
              </span>
            </Link>
          )}
          <h1
            className={`${frontmatter.image ? "mt-10" : ""} max-w-3xl font-display text-4xl leading-tight tracking-tight text-slate-900 sm:text-5xl`}
          >
            {frontmatter.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-sm text-slate-500">
            <span>
              By{" "}
              <span className="font-medium text-slate-700">
                {frontmatter.author}
              </span>
              {frontmatter.authorRole && `, ${frontmatter.authorRole}`}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Published <PostDate date={frontmatter.publishedAt} />
            </span>
            {wasUpdated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated <PostDate date={frontmatter.updatedAt} />
                </span>
              </>
            )}
          </div>
        </header>
        <Prose className="mt-10 sm:mt-12">{children}</Prose>
      </article>
    </main>
  );
}
