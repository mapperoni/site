import { EyeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { getImageProps } from "next/image";
import { Button } from "@/components/Button";
import HeroBgImage from "@/images/hero-bg.png";
import HeroBgImageMobile from "@/images/hero-bg-mobile.png";

export function Hero() {
  const { props: desktopImageProps } = getImageProps({
    alt: "",
    sizes: "(min-width: 1280px) 50vw, 100vw",
    src: HeroBgImage,
  });
  const { props: mobileImageProps } = getImageProps({
    alt: "",
    sizes: "100vw",
    src: HeroBgImageMobile,
  });

  return (
    <div className="overflow-hidden bg-gray-100">
      <div className="py-8 lg:py-16 sm:px-2 lg:px-0 relative">
        <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12 relative">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline bg-linear-to-r from-cyan-800 via-emerald-700 to-cyan-800 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Survey forms + collaborative maps.
              </p>
              <p className="mt-3 text-2xl tracking-tight text-primary-content">
                Professionals around the world use mapperoni to collect data.
                For public participation, urban planning, academic research and
                more.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <Button
                  href="https://app.mapperoni.com/t/official/p/demo"
                  variant="accent"
                >
                  <EyeIcon className="size-5" />
                  View demo
                </Button>
                <Button href="https://app.mapperoni.com/">
                  <PaperAirplaneIcon className="size-5" />
                  Start for free
                </Button>
              </div>
            </div>
          </div>
        </div>
        <picture>
          <source
            media="(min-width: 640px)"
            sizes={desktopImageProps.sizes}
            srcSet={desktopImageProps.srcSet}
          />
          <img
            {...mobileImageProps}
            alt=""
            fetchPriority="high"
            loading="eager"
            className="absolute right-0 bottom-0 h-full w-auto object-cover object-right opacity-40 blur-[2px] sm:top-0 sm:bottom-auto xl:opacity-80"
          />
        </picture>
      </div>
    </div>
  );
}
