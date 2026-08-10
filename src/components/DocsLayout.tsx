import type { Node } from "@markdoc/markdoc";

import { DocsHeader } from "@/components/DocsHeader";
import { Navigation } from "@/components/Navigation";
import { PrevNextLinks } from "@/components/PrevNextLinks";
import { Prose } from "@/components/Prose";
import { TableOfContents } from "@/components/TableOfContents";
import { collectSections } from "@/lib/sections";

export function DocsLayout({
  children,
  frontmatter: { title },
  nodes,
  activePath,
}: {
  children: React.ReactNode;
  frontmatter: { title?: string };
  nodes: Array<Node>;
  activePath?: string;
}) {
  const tableOfContents = collectSections(nodes);

  return (
    <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
      <div className="hidden lg:relative lg:block lg:flex-none">
        <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50" />
        <div className="sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
          <Navigation activePath={activePath} />
        </div>
      </div>
      <div className="max-w-2xl min-w-0 flex-auto px-4 py-10 md:py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
        <article>
          <DocsHeader title={title} activePath={activePath} />
          <Prose>{children}</Prose>
        </article>
        <PrevNextLinks activePath={activePath} />
      </div>
      <TableOfContents tableOfContents={tableOfContents} />
    </div>
  );
}
