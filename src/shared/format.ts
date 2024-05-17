import { makeDestructurable } from "@bernankez/utils";
import { type AcceptableTheme, type Color, type ColorKeywords, type ShapeKeywords, type Theme, colorKeywords, shapeKeywords } from "../types";
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

export function kebabCase(str: string) {
  return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
}

export function hexToRGB(hex: string) {
  const hexValue = hex.replace("#", "");
  const r = Number.parseInt(hexValue.substring(0, 2), 16);
  const g = Number.parseInt(hexValue.substring(2, 4), 16);
  const b = Number.parseInt(hexValue.substring(4, 6), 16);
  return makeDestructurable({ r, g, b }, [r, g, b] as [number, number, number]);
}

export function hexToHsl(hex: string) {
  const { r, g, b } = hexToRGB(hex);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r1:
        h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
        break;
      case g1:
        h = ((b1 - r1) / d + 2) / 6;
        break;
      case b1:
        h = ((r1 - g1) / d + 4) / 6;
        break;
    }
  }
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
