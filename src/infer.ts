import chroma from "chroma-js";
import type { AcceptableTheme } from "./types";
import { toTheme } from "./shared/format";

export const defaultColors: AcceptableTheme = {
  colors: {
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
    border: "#e5e7eb",
    info: "#00b3f0",
    infoForeground: "#000000",
    success: "#00a96f",
    successForeground: "#000000",
    warning: "#ffc22d",
    warningForeground: "#000000",
    error: "#ff6f70",
    errorForeground: "#000000",
  },
  radius: "0.5rem",
};

// convert colors to targetMode
export function inferThemeFromColor(themeColor: string) {
  if (!chroma.valid(themeColor)) {
    throw new Error(`Invalid color ${themeColor}`);
  }
  const primary = new Infer(themeColor);

  const theme: AcceptableTheme = {
    colors: {
      background: {
        light: primary.lighten(0.99).hex(),
        dark: primary.darken(0.99).hex(),
      },
      foreground: {
        light: primary.darken(0.99).hex(),
        dark: primary.lighten(0.99).hex(),
      },
      primary: {
        light: primary.hex(),
        dark: primary.darken(0.1).hex(),
      },
      primaryForeground: {
        light: primary.opposite(0.1).hex(),
        dark: primary.darken(0.1).opposite(0.1).hex(),
      },
      secondary: {
        light: primary.lighten(0.75).hex(),
        dark: primary.darken(0.75).hex(),
      },
      secondaryForeground: {
        light: primary.darken(0.75).hex(),
        dark: primary.lighten(0.75).hex(),
      },
      accent: {
        light: primary.lighten(0.9).hex(),
        dark: primary.darken(0.9).hex(),
      },
      accentForeground: {
        light: primary.darken(0.9).hex(),
        dark: primary.lighten(0.9).hex(),
      },
      muted: {
        light: primary.lighten(0.9).hex(),
        dark: primary.darken(0.9).hex(),
      },
      mutedForeground: {
        light: primary.mix("gray", 0.9).hex(),
        dark: primary.lighten(0.9).mix("gray", 0.1).hex(),
      },
      border: "#e5e7eb",
      info: "#00b3f0",
      infoForeground: "#000000",
      success: "#00a96f",
      successForeground: "#000000",
      warning: "#ffc22d",
      warningForeground: "#000000",
      error: "#ff6f70",
      errorForeground: "#000000",
    },
    radius: "0.5rem",
  };
  return toTheme(theme);
}

class Infer {
  private primaryColor: chroma.Color;

  constructor(primaryColor: string | chroma.Color) {
    this.primaryColor = chroma(primaryColor);
  }

  clone() {
    return new Infer(this.primaryColor);
  }

  mix(color: string | chroma.Color, f?: number) {
    const cloned = this.clone();
    cloned.primaryColor = cloned.primaryColor.mix(color, f);
    return cloned;
  }

  luminance(): number;
  luminance(f: number): Infer;
  luminance(f?: number) {
    if (f === undefined) {
      return this.primaryColor.luminance();
    }
    const cloned = this.clone();
    cloned.primaryColor = cloned.primaryColor.luminance(f, "oklch");
    return cloned;
  }

  lighten(f?: number) {
    return this.mix("#ffffff", f);
  }

  darken(f?: number) {
    return this.mix("#000000", f);
  }

  opposite(offset = 0) {
    const l = this.primaryColor.luminance();
    return this.luminance(l > 0.5 ? 0 + offset : 1 - offset);
  }

  hex() {
    return this.primaryColor.hex();
  }
}
