import { RssIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Search } from "@/components/Search";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8">
      <div className="flex flex-none flex-wrap gap-2 sm:gap-4 lg:gap-6 items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex lg:hidden">
          <MobileNavigation />
        </div>
        <div className="relative flex grow items-center">
          <Link href="/" aria-label="Home page">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        <div>
          <Search />
        </div>
        <div className="relative flex items-center justify-end gap-5 md:grow">
          <Link
            href="/blog"
            className="hidden text-sm font-bold text-slate-600 hover:text-sky-600 sm:flex gap-1 items-center"
          >
            <RssIcon className="size-4" /> Blog
          </Link>
          <Button href="https://app.mapperoni.com/" variant="primary">
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main>{children}</main>
    </div>
  );
}
