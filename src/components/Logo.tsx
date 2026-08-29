import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type LogoProps = Omit<
  ComponentPropsWithoutRef<typeof Image>,
  "src" | "alt" | "width" | "height"
> & { alt?: string };

const LOGO_WIDTH = 378;
const LOGO_HEIGHT = 77;

export function Logo({ alt = "Mapperoni", ...props }: LogoProps) {
  return (
    <Image
      src="/images/brand/mapperoni-logo.png"
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes="159px"
      {...props}
    />
  );
}
