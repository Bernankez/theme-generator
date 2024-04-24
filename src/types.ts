import { n } from "@bernankez/utils";

export type Theme = Record<ColorKeywords, Color> & Record<ShapeKeywords, string>;

export interface Color {
  light: string;
  dark: string;
}

export const colorKeywords = n([
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "accent",
  "accentForeground",
]);

export type ColorKeywords = typeof colorKeywords[number];

export const shapeKeywords = n([
  "radius",
]);

export type ShapeKeywords = typeof shapeKeywords[number];
