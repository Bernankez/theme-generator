import type { Theme as UnoCSSTheme } from "unocss/preset-uno";
import { findCommonPrefix } from "../shared";
import type { CommonTheme } from "../types";

export interface TransformUnoCSSOptions<T extends CommonTheme> {
  cssPrefix?: string;
  resolve?: (key: Exclude<keyof T, "colors">) => Omit<UnoCSSTheme, "colors"> | undefined | null;
}

export function transformUnoCSS<T extends CommonTheme>(theme: T, options?: TransformUnoCSSOptions<T>): UnoCSSTheme {
  const { cssPrefix } = options || {};
  const unocss: UnoCSSTheme = {
    colors: {},
  };
  const colors = Object.keys(theme.colors);
  const colorSet = new Set(colors);
  for (const color of colorSet) {
    const prefixes = findCommonPrefix(color, [...colorSet]);
    for (const prefix of prefixes) {
      colorSet.delete(prefix.key);
    }
    if (prefixes.length === 1) {
      unocss.colors![color] = `rgb(var(--${cssPrefix ? `${cssPrefix}-` : ""}${prefixes[0].kebabCase}))`;
    } else if (prefixes.length > 1) {
      for (const prefix of prefixes) {
        const key = prefix.prefix;
        if (!unocss.colors![key]) {
          unocss.colors![key] = {};
        }
        (unocss.colors![key] as any)[prefix.left || "DEFAULT"] = `rgb(var(--${cssPrefix ? `${cssPrefix}-` : ""}${prefix.kebabCase}))`;
      }
    }
  }
  for (const key in theme) {
    if (key === "colors") {
      continue;
    }
    const resolved = options?.resolve?.(key as string as Exclude<keyof T, "colors">);
    if (resolved) {
      Object.assign(unocss, resolved);
    }
  }

  return unocss;
}
