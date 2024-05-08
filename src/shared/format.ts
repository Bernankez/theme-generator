import { makeDestructurable } from "@bernankez/utils";
import { type Color, type ColorKeywords, type ShapeKeywords, type Theme, colorKeywords, shapeKeywords } from "../types";
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

export function toTheme(obj: Record<string, string | Color>): Theme {
  const theme = {} as Theme;
  const keys: (ColorKeywords | ShapeKeywords)[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (isColor(key)) {
      theme[key] = toColor(value);
      keys.push(key);
    } else if (isShape(key) && typeof value === "string") {
      theme[key] = value;
      keys.push(key);
    }
  }
  colorKeywords.forEach((keyword) => {
    if (!keys.includes(keyword)) {
      theme[keyword] = toColor("");
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
