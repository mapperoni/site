import { EyeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@/components/Button";
import HeroBgImage from "@/images/hero-bg.png";

export function Hero() {
  return (
    <div className="overflow-hidden bg-[#f6f6f6]">
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
        <Image
          src={HeroBgImage}
          alt=""
          fetchPriority="high"
          loading="eager"
          placeholder="blur"
          className="absolute right-0 top-0 h-full w-auto object-cover object-right opacity-40 blur-[2px] xl:opacity-80"
        />
      </div>
    </div>
  );
}
