import Image from "next/image";

export function NextImage(props: {
  children: React.ReactNode;
  src: string;
  alt: string;
  width: number;
  height: number;
  class?: string;
}) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.class}
    >
      {props.children}
    </Image>
  );
}
