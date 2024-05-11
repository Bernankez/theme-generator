import type { Theme } from "unocss/preset-uno";
import { findCommonPrefix } from "../shared";
import type { CommonTheme } from "../types";

export interface TransformTailwindOptions<T extends CommonTheme> {
  cssPrefix?: string;
  resolveVarName?: (key: Exclude<keyof T, "colors"> | keyof T["colors"]) => string | undefined | null;
}

type Colors = Theme["colors"];

export interface TailwindTheme {
  colors: Colors;
  extend: {
    borderRadius: Record<string, string>;
  };
}

export function transformTailwind<T extends CommonTheme>(theme: T, options?: TransformTailwindOptions<T>): TailwindTheme {
  // NOTE more general
  const { cssPrefix } = options || {};
  const tailwind: TailwindTheme = {
    colors: {},
    extend: {
      borderRadius: {},
    },
  };
  const colors = Object.keys(theme.colors);
  const colorSet = new Set(colors);
  for (const color of colorSet) {
    const prefixes = findCommonPrefix(color, [...colorSet]);
    for (const prefix of prefixes) {
      colorSet.delete(prefix.key);
    }
    if (prefixes.length === 1) {
      tailwind.colors![color] = `rgb(var(--${cssPrefix ? `${cssPrefix}-` : ""}${prefixes[0].kebabCase}))`;
    } else if (prefixes.length > 1) {
      for (const prefix of prefixes) {
        const key = prefix.prefix;
        if (!tailwind.colors![key]) {
          tailwind.colors![key] = {};
        }
        (tailwind.colors![key] as any)[prefix.left || "DEFAULT"] = `rgb(var(--${cssPrefix ? `${cssPrefix}-` : ""}${prefix.kebabCase}))`;
      }
    }
  }
  for (const key in theme) {
    if (key === "colors") {
      continue;
    }
    if (key === "radius") {
      tailwind.extend.borderRadius = {
        lg: `var(--${cssPrefix ? `${cssPrefix}-` : ""}radius)`,
        md: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 2px)`,
        sm: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 4px)`,
      };
    }
  }

  return tailwind;
}
