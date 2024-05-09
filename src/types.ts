import { n } from "@bernankez/utils";
import type { DefineThemeOptions } from ".";

export type TransformerOptions = DefineThemeOptions & { theme: Theme };
/**
 * Transform into atomic css engine theme
 */
export type Transformer<T = unknown> = (options: TransformerOptions) => T;

export type Theme = {
  colors: Record<ColorKeywords, Color>;
  radius: string;
} & {
  [key: string]: string;
};

export interface AcceptableTheme {
  colors: Partial<Record<ColorKeywords, Color | string>>;
  radius?: string;
}

export type CommonTheme = {
  colors: Record<string, Color>;
} & {
  [key: string]: string;
};

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
