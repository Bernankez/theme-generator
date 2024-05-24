import { dark, hexToRGB, kebabCase, light } from "../shared";
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

  const resolveScheme = scheme === "dark" ? dark : light;
  const resolvedTheme = resolveScheme(theme);

  for (const _key in resolvedTheme) {
    const key = _key as keyof typeof resolvedTheme;
    if (key === "colors") {
      for (const c in resolvedTheme.colors) {
        if (!resolvedTheme.colors[c]) {
          continue;
        }
        const resolved = resolve(c, [...hexToRGB(resolvedTheme.colors[c])].join(" "), scheme);
        Object.assign(style, resolved);
      }
      continue;
    }
    // Only set shape keywords in light scheme
    if (scheme === "light") {
      if (!resolvedTheme[key]) {
        continue;
      }
      const value = resolvedTheme[key];
      const resolved = resolve(key as string, value, scheme);
      Object.assign(style, resolved);
    }
  }
  return style;
}
