import { makeDestructurable } from "@bernankez/utils";
import chroma from "chroma-js";
import { type AcceptableTheme, type Color, type ColorKeywords, type CommonTheme, type ShapeKeywords, type Theme, colorKeywords, shapeKeywords } from "../types";
import { isColor, isShape } from "./is";

export function toColor(color: string | Color) {
  if (typeof color === "string") {
    return {
      light: color,
      dark: color,
    };
  }
  return color;
}

export function toTheme(obj: AcceptableTheme): Theme {
  const theme = {
    colors: {},
  } as Theme;
  const keys: (ColorKeywords | ShapeKeywords)[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key === "colors") {
      for (const c in obj.colors) {
        if (isColor(c)) {
          const color = obj.colors[c];
          if (color) {
            theme.colors[c] = toColor(color);
            keys.push(c);
          }
        }
      }
    } else if (isShape(key)) {
      theme[key] = value as string;
      keys.push(key);
    }
  }
  colorKeywords.forEach((keyword) => {
    if (!keys.includes(keyword)) {
      theme.colors[keyword] = toColor("");
    }
  });
  shapeKeywords.forEach((keyword) => {
    if (!keys.includes(keyword)) {
      theme[keyword] = "";
    }
  });
  return theme;
}

export function light<T extends CommonTheme>(theme: T): { colors: Record<keyof T["colors"], string> } & Omit<T, "colors"> {
  const colors = {} as Record<keyof T["colors"], string>;
  for (const [key, value] of Object.entries(theme.colors)) {
    colors[key as keyof T["colors"]] = value.light;
  }
  const { colors: _, ...left } = theme;
  return {
    colors,
    ...left,
  };
}

export function dark<T extends CommonTheme>(theme: T): { colors: Record<keyof T["colors"], string> } & Omit<T, "colors"> {
  const colors = {} as Record<keyof T["colors"], string>;
  for (const [key, value] of Object.entries(theme.colors)) {
    colors[key as keyof T["colors"]] = value.dark;
  }
  const { colors: _, ...left } = theme;
  return {
    colors,
    ...left,
  };
}

export function kebabCase(str: string) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export function hexToRGB(hex: string) {
  if (!chroma.valid(hex)) {
    return hex;
  }
  const [r, g, b] = chroma(hex).rgb();
  return makeDestructurable({ r, g, b }, [r, g, b] as [number, number, number]);
}

export function hexToHsl(hex: string) {
  if (!chroma.valid(hex)) {
    return hex;
  }
  let [h, s, l] = chroma(hex).hsl();
  h = h || 0;
  return makeDestructurable({ h, s, l }, [h, s, l]);
}

export function findCommonPrefix(key: string, keys: string[]) {
  const prefix = kebabCase(key).split("-")[0];
  return keys.filter(k => kebabCase(k).startsWith(prefix)).map((k) => {
    const kebab = kebabCase(k);
    const [prefix] = kebab.split("-");
    return {
      key: k,
      kebabCase: kebab,
      prefix,
      left: k.slice(prefix.length).toLowerCase(),
    };
  });
}
