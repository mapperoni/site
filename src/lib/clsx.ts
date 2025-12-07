type ClassValue =
  | string
  | number
  | null
  | undefined
  | boolean
  | ClassDictionary
  | ClassArray;

type ClassDictionary = Record<
  string,
  boolean | number | string | null | undefined
>;
type ClassArray = Array<ClassValue>;

function pushClassNames(value: ClassValue, bucket: string[]) {
  if (!value) return;

  if (typeof value === "string" || typeof value === "number") {
    bucket.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      pushClassNames(item, bucket);
    }
    return;
  }

  if (typeof value === "object") {
    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) {
        bucket.push(key);
      }
    }
  }
}

/**
 * Minimal clsx-style class name joiner to avoid the external dependency.
 */
export default function clsx(...inputs: ClassValue[]) {
  const classNames: string[] = [];

  for (const input of inputs) {
    pushClassNames(input, classNames);
  }

  return classNames.join(" ");
}
