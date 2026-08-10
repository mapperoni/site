"use client";

import { RssIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { Logo } from "@/components/Logo";
import { MobileNavigation } from "@/components/MobileNavigation";
import { Navigation } from "@/components/Navigation";
import { Search } from "@/components/Search";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8">
      <div className="flex flex-none flex-wrap gap-2 sm:gap-4 lg:gap-6 items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex lg:hidden">
          <MobileNavigation />
        </div>
        <div className="relative flex grow basis-0 items-center">
          <Link href="/" aria-label="Home page">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        <div>
          <Search />
        </div>
        <div className="relative flex basis-0 items-center justify-end gap-5 md:grow">
          <Link
            href="/blog"
            className="hidden text-sm font-bold text-slate-600 hover:text-sky-600 sm:flex gap-1 items-center"
          >
            <RssIcon className="size-4" /> Blog
          </Link>
          <Button href="https://app.mapperoni.com/" variant="primary">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <div className="flex w-full flex-col">
      <Header />

      {isHomePage && <Hero />}

      {isBlogPage ? (
        children
      ) : (
        <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50" />
            <div className="sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
              <Navigation />
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
