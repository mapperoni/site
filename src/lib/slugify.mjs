const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC_REGEX = /[^a-zA-Z0-9]+/g;
const DUPLICATE_HYPHENS_REGEX = /-{2,}/g;

const CHARACTER_REPLACEMENTS = [
  [/@/g, "at"],
  [/&/g, "and"],
  [/\u00DF/g, "ss"], // ß
  [/\u00C6|\u00E6/g, "ae"], // Æ, æ
  [/\u00D8|\u00F8/g, "o"], // Ø, ø
];

/**
 * Convert a string into a URL-friendly slug.
 * Roughly mirrors @sindresorhus/slugify defaults without the dependency.
 */
export function slugify(value) {
  if (value === undefined || value === null) return "";

  const normalized = String(value)
    .normalize("NFKD")
    .replace(COMBINING_MARKS_REGEX, "");

  const replaced = CHARACTER_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    normalized,
  );

  const slug = replaced
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(NON_ALPHANUMERIC_REGEX, "-")
    .replace(DUPLICATE_HYPHENS_REGEX, "-")
    .replace(/^-+|-+$/g, "");

  return slug;
}

/**
 * Create a slugifier that ensures unique slugs by appending counters.
 * The returned function exposes a `reset` method to clear its internal state.
 */
export function slugifyWithCounter() {
  const counts = new Map();

  const slugger = (value) => {
    const base = slugify(value);
    const hits = counts.get(base) ?? 0;

    counts.set(base, hits + 1);
    if (!base) return base;
    return hits === 0 ? base : `${base}-${hits + 1}`;
  };

  slugger.reset = () => counts.clear();

  return slugger;
}
