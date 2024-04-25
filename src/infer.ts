import type { AcceptableTheme } from "./types";
import { toTheme } from "./utils/format";

export const defaultColors: AcceptableTheme = {
  background: {
    light: "#ffffff",
    dark: "#0a0a0a",
  },
  foreground: {
    light: "#0a0a0a",
    dark: "#fafafa",
  },
  primary: {
    light: "#171717",
    dark: "#fafafa",
  },
  primaryForeground: {
    light: "#fafafa",
    dark: "#171717",
  },
  secondary: {
    light: "#f5f5f5",
    dark: "#262626",
  },
  secondaryForeground: {
    light: "#171717",
    dark: "#fafafa",
  },
  accent: {
    light: "#f5f5f5",
    dark: "#262626",
  },
  accentForeground: {
    light: "#171717",
    dark: "#fafafa",
  },
  muted: {
    light: "#f5f5f5",
    dark: "#262626",
  },
  mutedForeground: {
    light: "#737373",
    dark: "#fafafa",
  },
  info: "#00b3f0",
  infoForeground: "#000000",
  success: "#00a96f",
  successForeground: "#000000",
  warning: "#ffc22d",
  warningForeground: "#000000",
  error: "#ff6f70",
  errorForeground: "#000000",
  radius: "0.5rem",
};

// convert colors to targetMode
export function inferThemeFromColor(themeColor: string) {
  console.log(themeColor);
  const theme: AcceptableTheme = {
    ...defaultColors,
  };
  return toTheme(theme);
}
