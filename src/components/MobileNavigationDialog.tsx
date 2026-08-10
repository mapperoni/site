"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";

function CloseIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  );
}

export function MobileNavigationDialog({ onClose }: { onClose: () => void }) {
  const activePath = usePathname();

  return (
    <Dialog
      open
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur-sm lg:hidden"
      aria-label="Navigation"
    >
      <DialogPanel className="min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 sm:px-6 dark:bg-slate-900">
        <div className="flex items-center">
          <button type="button" onClick={onClose} aria-label="Close navigation">
            <CloseIcon className="h-6 w-6 stroke-slate-500" />
          </button>
          <Link href="/" className="ml-6" aria-label="Home page">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
        <Navigation
          className="mt-5 px-1"
          activePath={activePath}
          onLinkClick={onClose}
        />
      </DialogPanel>
    </Dialog>
  );
}
