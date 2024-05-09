import type { Prettier } from "@bernankez/utils";
import { findCommonPrefix, isColor, isShape } from "../shared";
import type { ColorKeywords, TransformerOptions } from "../types";

export type SingleColors = Extract<ColorKeywords, "background" | "foreground">;
export type MultiColors = Extract<ColorKeywords, "primary" | "secondary" | "accent" | "muted" | "info" | "success" | "warning" | "error">;

export type UnoCSSTheme = Prettier<{
  colors: {
    [Color in SingleColors]: string;
  } & {
    [Color in MultiColors]: {
      DEFAULT: string;
      foreground: string;
    }
  };
  borderRadius: {
    lg: string;
    md: string;
    sm: string;
  };
}>;

export function transformUnoCSS() {
  // TODO refactor
  return (options: TransformerOptions) => {
    const { theme, cssPrefix } = options;

    const unocss = {
      colors: {},
      borderRadius: {},
    } as UnoCSSTheme;
    const _keys = Object.keys(theme);
    const keys = new Set(_keys);
    for (const key of keys) {
      if (isColor(key)) {
        const prefixes = findCommonPrefix(key, [...keys]);
        for (const prefix of prefixes) {
          keys.delete(prefix.key);
        }
        if (prefixes.length === 1) {
          const singleKey = key as SingleColors;
          unocss.colors[singleKey] = `rgb(var(--${cssPrefix ? `${cssPrefix}-` : ""}${prefixes[0].kebabCase}))`;
        } else if (prefixes.length > 1) {
          for (const prefix of prefixes) {
            const multiKey = prefix.prefix as MultiColors;
            if (!unocss.colors[multiKey]) {
              unocss.colors[multiKey] = {} as { DEFAULT: string; foreground: string };
            }
            unocss.colors[multiKey][prefix.left as "foreground" || "DEFAULT"] = `rgb(var(--${cssPrefix ? `${cssPrefix}-` : ""}${prefix.kebabCase}))`;
          }
        }
      } else if (isShape(key)) {
        if (key === "radius") {
          unocss.borderRadius = {
            lg: `var(--${cssPrefix ? `${cssPrefix}-` : ""}radius)`,
            md: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 2px)`,
            sm: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 4px)`,
          };
        }
      }
    }
    return {
      unocss,
    };
  };
}
