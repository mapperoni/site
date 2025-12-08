import Link from "next/link";
import clsx from "@/lib/clsx";

const button =
  "rounded-md gap-2 h-10 max-h-10 py-3 px-4 text-sm font-medium font-sans content-center shrink-0 flex items-center";

const variantStyles = {
  primary: "bg-primary",
  secondary: "bg-neutral text-neutral-content",
  accent: "bg-accent",
};

type ButtonProps = {
  variant?: keyof typeof variantStyles;
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  className = clsx(button, variantStyles[variant], className);

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
}
