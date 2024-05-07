import { n } from "@bernankez/utils";
import type { DefineThemeOptions } from ".";

export type TransformerOptions = DefineThemeOptions & { theme: Theme };
export type Transformer<T = unknown> = (options: TransformerOptions) => T;

export type Theme = Record<ColorKeywords, Color> & Record<ShapeKeywords, string>;

export type AcceptableTheme = Record<ColorKeywords, string | Color> & Record<ShapeKeywords, string>;

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
  "radius",
]);

export type ColorKeywords = typeof colorKeywords[number];

export type ShapeKeywords = typeof shapeKeywords[number];

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type TransformerReturns<Options> = Options extends { transformers: Transformer<infer T>[] } ? UnionToIntersection<T> : never;
