import { type ColorKeywords, type ShapeKeywords, colorKeywords, shapeKeywords } from "../types";

export function isColor(keyword: string): keyword is ColorKeywords {
  return colorKeywords.includes(keyword as ColorKeywords);
}

export function isShape(keyword: string): keyword is ShapeKeywords {
  return shapeKeywords.includes(keyword as ShapeKeywords);
}
