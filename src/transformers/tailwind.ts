import type { TransformerOptions } from "../types";
import { type UnoCSSTheme, transformUnoCSS } from "./unocss";

export type { SingleColors, MultiColors } from "./unocss";

export type TailwindTheme = UnoCSSTheme;

export function transformTailwind() {
  const transformer = transformUnoCSS();
  return (options: TransformerOptions) => {
    const { unocss } = transformer(options);
    return {
      tailwind: unocss,
    };
  };
}
