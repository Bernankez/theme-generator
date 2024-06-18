import { defineStore } from "pinia";
import { ref } from "vue";
import { defaultColors, defineTheme } from "@bernankez/theme-generator";

// export const modes = n(["default", "infer", "preset", "custom"]);

// export type Mode = typeof modes[number];

// export interface MenuItemConfig {
//   id: string;
//   icon?: string;
//   label: string | (() => string);
//   title?: string;
//   mode: Mode;
//   theme?: AcceptableTheme | (() => AcceptableTheme);
//   cssPrefix?: string;
//   /** Defaults to false */
//   deletable?: boolean;
// }

export const useThemeStore = defineStore("theme", () => {
  const themeColor = ref("#c14344");
  const cssPrefix = ref("");

  const theme = ref(defineTheme({
    defaults: defaultColors,
  }));

  return {
    themeColor,
    cssPrefix,
    theme,
  };
}, {
  persist: true,
});
