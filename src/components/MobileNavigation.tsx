"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MobileNavigationDialog = dynamic(() =>
  import("@/components/MobileNavigationDialog").then(
    (module) => module.MobileNavigationDialog,
  ),
);

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-8 w-8 stroke-slate-500" />
      </button>
      {isOpen && <MobileNavigationDialog onClose={() => setIsOpen(false)} />}
    </>
  );
}
