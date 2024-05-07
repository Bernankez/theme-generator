import { merge } from "lodash-es";
import type { AcceptableTheme, Scheme, Theme, Transformer, TransformerReturns } from "./types";
import { kebabCase, toTheme } from "./shared/format";
import { isColor } from "./shared";

export * from "./types";
export * from "./infer";
export * from "./transformers";
export * from "./shared";

export interface DefineThemeOptions {
  defaults: AcceptableTheme;
  cssPrefix?: string;
  overrides?: Partial<AcceptableTheme>;
}

export interface ThemeValues {
  theme: Theme;
  css: {
    light: string;
    dark: string;
  };
}

export function defineTheme(options: DefineThemeOptions): ThemeValues;
export function defineTheme<Options extends DefineThemeOptions & { transformers: Transformer[] }>(options: Options): ThemeValues & TransformerReturns<Options>;
export function defineTheme(options: DefineThemeOptions & { transformers?: Transformer[] }) {
  const { cssPrefix, defaults, overrides = {}, transformers = [] } = options;

  const mergedTheme = merge({}, defaults, overrides);
  const theme = toTheme(mergedTheme);
  const lightCSS = generateCSSProperties(theme, "light", cssPrefix);
  const darkCSS = generateCSSProperties(theme, "dark", cssPrefix);
  const transformerReturns = merge({}, ...transformers.map(transformer => transformer({ ...options, theme })));

  return {
    theme,
    css: {
      light: lightCSS,
      dark: darkCSS,
    },
    ...transformerReturns,
  };
}

export function generateCSSProperties(theme: Theme, scheme: Scheme, cssPrefix?: string) {
  return `:root {
${Object.entries(theme).filter(([key, value]) => {
  if (isColor(key)) {
    return !!theme[key][scheme];
  }
  return !!value;
}).map(([key, value]) => {
  return `  --${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(key)}: ${isColor(key) ? theme[key][scheme] : value};`;
}).join("\n")}
}`;
}
