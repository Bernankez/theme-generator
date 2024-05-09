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

export interface GenerateCSSOptions {
  cssPrefix?: string;
}

export function generateCSS(theme: CommonTheme, options?: GenerateCSSOptions) {
  return {
    light: generateCSSFromScheme(theme, "light", options),
    dark: generateCSSFromScheme(theme, "dark", options),
  };
}

export function generateCSSFromScheme(theme: CommonTheme, scheme: Scheme, options?: GenerateCSSOptions) {
  const { cssPrefix } = options || {};
  const css: Record<string, string> = {};
  for (const key in theme) {
    if (key === "colors") {
      for (const c in theme.colors) {
        if (!theme.colors[c][scheme]) {
          continue;
        }
        css[`--${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(c)}`] = [...hexToRGB(theme.colors[c][scheme])].join(" ");
      }
    } else if (scheme !== "dark") {
      if (!theme[key]) {
        continue;
      }
      css[`--${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(key)}`] = theme[key];
    }
  }
  return `:root${scheme === "dark" ? " .dark" : ""} {
${Object.entries(css).map(([key, value]) => {
  return `  ${key}: ${value};`;
}).join("\n")}
}`;
}
