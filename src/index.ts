import { merge } from "lodash-es";
import type { DefineThemeOptions, Scheme, Theme, ThemeValues, Transformer, TransformerReturns } from "./types";
import { hexToRGB, isColor, kebabCase, toTheme } from "./shared";

export * from "./types";
export * from "./infer";
export * from "./transformers";
export * from "./shared";

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
  return `  --${cssPrefix ? `${cssPrefix}-` : ""}${kebabCase(key)}: ${isColor(key) ? [...hexToRGB(theme[key][scheme])].join(" ") : value};`;
}).join("\n")}
}`;
}
