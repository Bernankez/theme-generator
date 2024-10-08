import { merge } from "lodash-es";
import type { AcceptableTheme } from "./types";
import { toTheme } from "./shared";

export * from "./types";
export * from "./infer";
export * from "./transformers";
export * from "./presets";
export * from "./shared";

export interface DefineThemeOptions {
  defaults: AcceptableTheme;
  overrides?: Partial<AcceptableTheme>;
}

export function defineTheme(options: DefineThemeOptions) {
  const { defaults, overrides = {} } = options;

  const mergedTheme = merge({}, defaults, overrides);
  const theme = toTheme(mergedTheme);
  return theme;
}
