import { defineStore } from "pinia";
import { computed, ref, toValue, watchEffect } from "vue";
import { type AcceptableTheme, defaultColors, defineTheme, inferThemeFromColor } from "@bernankez/theme-generator";
import { n } from "@bernankez/utils";
import { push } from "notivue";
import { useShare } from "../composables/useShare";

export const modes = n(["default", "infer", "preset", "custom"]);

export type Mode = typeof modes[number];

export interface MenuItemConfig {
  id: string;
  icon?: string;
  label: string | (() => string);
  title?: string;
  mode: Mode;
  theme?: AcceptableTheme | (() => AcceptableTheme);
  cssPrefix?: string;
  /** Defaults to false */
  deletable?: boolean;
}

export const useThemeStore = defineStore("theme", () => {
  const { parse } = useShare();

  const cssPrefix = ref("");
  const themeColor = ref("#c14344");
  const theme = computed(() => defineTheme({
    defaults: defaultColors,
  }));
  const importTheme = parse();
  if (importTheme) {
    push.success({
      duration: 5000,
      message: "Theme imported from URL",
    });
  }
  const writableTheme = ref(importTheme || theme.value);

  return {
    cssPrefix,
    themeColor,
    theme,
    writableTheme,
  };
});
