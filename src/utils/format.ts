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
