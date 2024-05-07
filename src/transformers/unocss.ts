import { isColor } from "../shared";
import type { TransformerOptions } from "../types";

export function transformUnoCSS() {
  return (options: TransformerOptions) => {
    const { theme } = options;
    // eslint-disable-next-line unused-imports/no-unused-vars
    const unocss = {
      colors: {},
    };
    for (const key in theme) {
      if (isColor(key)) {
        // TODO
      }
    }
    return {
      unocss: {

      },
    };
  };
}
