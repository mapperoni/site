import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { Providers } from "@/app/providers";
import { Layout } from "@/components/Layout";
import clsx from "@/lib/clsx";

import "@/styles/tailwind.css";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: "../fonts/lexend.woff2",
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mapperoni.com"),
  title: {
    template: "%s | mapperoni",
    default: "mapperoni",
  },
  description:
    "Enhance your surveys to collect geodata and create collaborative maps. Secure, compliant, hosted in the EU.",
  alternates: {
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx("h-full antialiased", inter.variable, lexend.variable)}
    >
      <body className="flex min-h-full bg-white">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
