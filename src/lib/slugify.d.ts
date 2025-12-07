export type SlugifyWithCounter = ((value: unknown) => string) & {
  reset: () => void;
};

export function slugify(value: unknown): string;
export function slugifyWithCounter(): SlugifyWithCounter;
