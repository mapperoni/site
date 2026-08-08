export function PricingTiers({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-12 space-y-4">{children}</div>;
}

export function PricingTier({
  name,
  price,
  features,
  highlight = false,
  href,
  cta,
}: {
  name: string;
  price?: string;
  features: string[];
  highlight?: boolean;
  href?: string;
  cta?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border p-6 ${
        highlight
          ? "border-sky-500 bg-sky-50/50 dark:border-sky-400 dark:bg-sky-950/20"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {name}
          </h3>
          {price && (
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {price}
            </p>
          )}
          {href && cta && (
            <a
              href={href}
              className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-300"
            >
              {cta}
            </a>
          )}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="text-md text-slate-700 dark:text-slate-300"
            >
              {feature.startsWith("Everything") ? (
                <em className="text-slate-500 dark:text-slate-400">
                  {feature}
                </em>
              ) : (
                feature
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
