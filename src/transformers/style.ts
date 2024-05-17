import { hexToRGB, kebabCase } from "../shared";
import type { CommonTheme, Scheme } from "../types";

export interface TransformStyleOptions<T extends CommonTheme> {
  cssPrefix?: string;
  resolve?: (key: Exclude<keyof T, "colors"> | keyof T["colors"], scheme: Scheme) => Record<string, string> | string | undefined | null | void;
  resolveKey?: (key: Exclude<keyof T, "colors"> | keyof T["colors"]) => string | undefined | null | void;
}

export function transformStyle<T extends CommonTheme>(theme: T, options?: TransformStyleOptions<T>) {
  return {
    light: generateStyleFromScheme(theme, "light", options),
    dark: generateStyleFromScheme(theme, "dark", options),
  };
}

export function generateStyleFromScheme<T extends CommonTheme>(theme: T, scheme: Scheme, options?: TransformStyleOptions<T>) {
  const { cssPrefix } = options || {};
  const style: Record<string, string> = {};

  function resolve(key: string, value: any, scheme: Scheme) {
    const resolved = options?.resolve?.(key, scheme);
    if (typeof resolved === "string" || !resolved) {
      const resolvedKey = options?.resolveKey?.(key);
      return {
        [`--${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(resolvedKey ?? key)}`]: resolved ?? value,
      };
    }
    return resolved;
  }

  for (const key in theme) {
    if (key === "colors") {
      for (const c in theme.colors) {
        if (!theme.colors[c][scheme]) {
          continue;
        }
        const resolved = resolve(c, [...hexToRGB(theme.colors[c][scheme])].join(" "), scheme);
        Object.assign(style, resolved);
      }
      continue;
    }
    // Only set shape keywords in light scheme
    if (scheme === "light") {
      if (!theme[key]) {
        continue;
      }
      const value = theme[key];
      const resolved = resolve(key, value, scheme);
      Object.assign(style, resolved);
    }
  }
  return style;
}
