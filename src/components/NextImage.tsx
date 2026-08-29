import Image from "next/image";

export function NextImage(props: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      sizes="(min-width: 1024px) 768px, (min-width: 640px) 672px, calc(100vw - 2rem)"
      style={{ width: "100%", height: "auto", borderRadius: "1.5rem" }}
    />
  );
}
