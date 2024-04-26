import type { AcceptableTheme, Scheme, Theme } from "./types";
import { kebabCase, toTheme } from "./utils/format";
import { isColor } from "./utils/is";

export * from "./types";
export * from "./utils/format";
export * from "./utils/is";
export * from "./infer";

export interface DefineThemeOptions {
  defaults: AcceptableTheme;
  cssPrefix?: string;
  overrides?: Partial<AcceptableTheme>;
  // unocss?: {
  //   /** un */
  //   prefix?: string;
  // };
  // tailwind?: {
  //   /** tw */
  //   prefix?: string;
  // };
}

export interface ThemeReturn {
  json: Theme;
  css: {
    light: string;
    dark: string;
  };
}

export function defineTheme(options: DefineThemeOptions): ThemeReturn {
  const { cssPrefix, defaults } = options;

  // TODO deep assign
  // assign(overrides, defaults)
  const theme = toTheme(defaults);
  const lightCSS = generateCSSProperties(theme, "light", cssPrefix);
  const darkCSS = generateCSSProperties(theme, "dark", cssPrefix);

  return {
    json: theme,
    css: {
      light: lightCSS,
      dark: darkCSS,
    },
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
