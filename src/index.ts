import { merge } from "lodash-es";
import type { AcceptableTheme, CommonTheme, Scheme } from "./types";
import { hexToRGB, kebabCase, toTheme } from "./shared";

export * from "./types";
export * from "./infer";
export * from "./transformers";
export * from "./shared";

// TODO preset/adaptor/keyMapping convert theme to UI library theme eg.daisy-ui/shadcn-ui/naive-ui...
// TODO transformers

export interface DefineThemeOptions {
  defaults: AcceptableTheme;
  cssPrefix?: string;
  overrides?: Partial<AcceptableTheme>;
}

export function defineTheme(options: DefineThemeOptions) {
  const { defaults, overrides = {} } = options;

  const mergedTheme = merge({}, defaults, overrides);
  const theme = toTheme(mergedTheme);
  return theme;
}

export interface GenerateStyleOptions<T extends CommonTheme> {
  cssPrefix?: string;
  resolveVarName?: (key: Exclude<keyof T, "colors"> | keyof T["colors"]) => string | undefined | null;
}

export function generateStyle<T extends CommonTheme>(theme: T, options?: GenerateStyleOptions<T>) {
  return {
    light: generateStyleFromScheme(theme, "light", options),
    dark: generateStyleFromScheme(theme, "dark", options),
  };
}

export function generateStyleFromScheme<T extends CommonTheme>(theme: T, scheme: Scheme, options?: GenerateStyleOptions<T>) {
  const { cssPrefix, resolveVarName } = options || {};
  const style: Record<string, string> = {};

  function getVarName(key: string) {
    return resolveVarName?.(key) || key;
  }

  for (const key in theme) {
    if (key === "colors") {
      for (const c in theme.colors) {
        if (!theme.colors[c][scheme]) {
          continue;
        }
        style[`--${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(getVarName(c))}`] = [...hexToRGB(theme.colors[c][scheme])].join(" ");
      }
    } else if (scheme !== "dark") {
      if (!theme[key]) {
        continue;
      }
      const value = theme[key];
      if (typeof value === "string") {
        style[`--${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(getVarName(key))}`] = value;
      }
    }
  }
  return style;
}
