import { n } from "@bernankez/utils";

export type Theme = {
  colors: Record<ColorKeywords, Color>;
} & {
  [key in ShapeKeywords]: string;
};

export type AcceptableTheme = {
  colors: Partial<Record<ColorKeywords, Color | string>>;
} & {
  [key in ShapeKeywords]?: string
};

export interface CommonTheme {
  colors: Record<string, Color>;
}

export type Scheme = "light" | "dark";

export interface Color extends Record<Scheme, string> {}

export const colorKeywords = n([
  "background",
  "foreground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "accent",
  "accentForeground",
  "muted",
  "mutedForeground",
  "info",
  "infoForeground",
  "success",
  "successForeground",
  "warning",
  "warningForeground",
  "error",
  "errorForeground",
]);

export const shapeKeywords = n([
  "borderRadius",
]);

export type ColorKeywords = typeof colorKeywords[number];

export type ShapeKeywords = typeof shapeKeywords[number];

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
