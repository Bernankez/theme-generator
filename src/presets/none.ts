import { transformStyle, transformTailwind, transformUnoCSS } from "../transformers";
import type { Theme } from "..";

export interface PresetNoneOptions {
  cssPrefix?: string;
}

export function presetNone(theme: Theme, options?: PresetNoneOptions) {
  const { cssPrefix } = options || {};

  const style = transformStyle(theme, {
    ...options,
  });
  const unocss = transformUnoCSS(theme, {
    ...options,
    resolve: (key) => {
      if (key === "radius") {
        return {
          borderRadius: {
            lg: `var(--${cssPrefix ? `${cssPrefix}-` : ""}radius)`,
            md: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 2px)`,
            sm: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 4px)`,
          },
        };
      }
    },
  });
  const tailwind = transformTailwind(theme, {
    ...options,
    resolve: (key) => {
      if (key === "radius") {
        return {
          borderRadius: {
            lg: `var(--${cssPrefix ? `${cssPrefix}-` : ""}radius)`,
            md: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 2px)`,
            sm: `calc(var(--${cssPrefix ? `${cssPrefix}-` : ""}radius) - 4px)`,
          },
        };
      }
    },
  });

  return {
    theme,
    style,
    unocss,
    tailwind,
  };
}
