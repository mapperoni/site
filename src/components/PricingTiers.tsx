export function PricingTiers({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-12 space-y-4">
      {children}
    </div>
  );
}

export function PricingTier({
  name,
  price,
  features,
  highlight = false,
}: {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
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
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {price}
          </p>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="text-md text-slate-700 dark:text-slate-300"
            >
              {feature.startsWith("Everything") ? (
                <em className="text-slate-500 dark:text-slate-400">{feature}</em>
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
