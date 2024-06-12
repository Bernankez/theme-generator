import type { Theme as UnoCSSTheme } from "unocss/preset-uno";
import type { CommonTheme, Scheme } from "../types";
import type { TailwindTheme } from "../transformers";

export * from "./none";
export * from "./shadcn";

export interface Preset<T extends CommonTheme = CommonTheme> {
  theme: T;
  style?: Record<Scheme, Record<string, string>>;
  unocss?: UnoCSSTheme;
  tailwind?: TailwindTheme;
}
