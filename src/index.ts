import type { Color, ColorKeywords, ShapeKeywords, Theme } from "./types";
import { toTheme } from "./utils/format";

export * from "./utils/format";
export * from "./utils/is";

export type DefineThemeOptions = ({
  themeColor: string;
} | {
  defaults: Record<ColorKeywords, string | Color> & Record<ShapeKeywords, string>;
}) & {
  overrides?: Partial<Record<ColorKeywords, string | Color> & Record<ShapeKeywords, string>>;
};

export function defineTheme(options: DefineThemeOptions): Theme {
  const defaultColors = toTheme(options.defaults);
  return defaultColors;
  // defaults
  // themeColor -> Palettes
  // overrides
}

export const defaultColors: Record<ColorKeywords, string | Color> & Record<ShapeKeywords, string> = {
  primary: {
    light: "#000",
    dark: "#bbb",
  },
  primaryForeground: {
    light: "",
    dark: "",
  },
  secondary: {
    light: "",
    dark: "",
  },
  secondaryForeground: {
    light: "",
    dark: "",
  },
  accent: {
    light: "",
    dark: "",
  },
  accentForeground: {
    light: "",
    dark: "",
  },
  radius: "",
};
