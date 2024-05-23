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
  const infer = new Infer(themeColor);

  const theme: AcceptableTheme = {
    colors: {
      // TODO
      background: {
        light: infer.mix("white", 0.99).hex(),
        dark: infer.mix("black", 0.99).hex(),
      },
      foreground: {
        light: infer.mix("black", 0.99).hex(),
        dark: infer.mix("white", 0.99).hex(),
      },
      primary: {
        light: infer.hex(),
        dark: infer.darken(0.1).hex(),
      },
      primaryForeground: {
        light: infer.foreground(0.1).hex(),
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
    return new Infer(this.primaryColor.hex());
  }

  mix(color: string | chroma.Color, f?: number) {
    const cloned = this.clone();
    cloned.primaryColor.mix(color, f);
    return cloned;
  }

  luminance(): number;
  luminance(f: number): Infer;
  luminance(f?: number) {
    if (f === undefined) {
      return this.primaryColor.luminance();
    }
    const cloned = this.clone();
    cloned.primaryColor.luminance(f, "oklch");
    return cloned;
  }

  darken(f?: number) {
    return this.mix("black", f);
  }

  foreground(offset = 0) {
    const cloned = this.clone();
    const l = cloned.primaryColor.luminance();
    return cloned.luminance(l > 0.5 ? 0 + offset : 1 - offset);
  }

  hex() {
    return this.primaryColor.hex();
  }
}
