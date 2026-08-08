import { Callout } from "@/components/Callout";
import { NextImage } from "@/components/NextImage";
import { PricingTier, PricingTiers } from "@/components/PricingTiers";
import { QuickLink, QuickLinks } from "@/components/QuickLinks";

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: "note",
        matches: ["note", "warning"],
        errorLevel: "critical",
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = "", caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  "next-image": {
    attributes: {
      src: { type: String },
      alt: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
    render: NextImage,
  },
  "quick-links": {
    render: QuickLinks,
  },
  "quick-link": {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  link: {
    render: ({ children, href, target }) => (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    attributes: {
      href: { type: String, required: true },
      target: { type: String, required: false },
    },
  },
  "pricing-tiers": {
    render: PricingTiers,
  },
  "pricing-tier": {
    selfClosing: true,
    render: PricingTier,
    attributes: {
      name: { type: String },
      price: { type: String, required: false },
      features: { type: Array },
      highlight: { type: Boolean, default: false },
      href: { type: String, required: false },
      cta: { type: String, required: false },
    },
  },
};

export default tags;
