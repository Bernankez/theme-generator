import { defineStore } from "pinia";
import { computed, ref, toValue, watchEffect } from "vue";
import { type AcceptableTheme, defaultColors, defineTheme, inferThemeFromColor } from "@bernankez/theme-generator";
import { n } from "@bernankez/utils";
import { useConfigStore } from "./config";

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
  const { configs } = useConfigStore();

  const cssPrefix = ref("");
  const themeColor = ref("#c14344");
  const menus = computed<MenuItemConfig[]>(() => [
    {
      id: "default",
      label: "default",
      mode: "default",
      theme: defaultColors,
    },
    {
      id: "infer",
      label: () => themeColor.value,
      mode: "infer",
      theme: () => inferThemeFromColor(themeColor.value),
      title: "Infer theme from a theme color",
    },
    ...configs.map(config => ({
      id: config._id,
      label: config.name,
      mode: "custom" as Mode,
      theme: config.theme,
      cssPrefix: config.cssPrefix,
      deletable: true,
    })),
  ]);
  const selectedId = ref("default");
  const selected = computed(() => menus.value.find(menu => menu.id === selectedId.value)!);
  const base = computed(() => selected.value.theme || defaultColors);
  const theme = computed(() => defineTheme({
    defaults: toValue(base.value),
  }));
  const writableTheme = ref(theme.value);

  watchEffect(() => {
    writableTheme.value = theme.value;
  });

  return {
    cssPrefix,
    themeColor,
    defaults: base,
    theme,
    writableTheme,
    menus,
    selected,
    selectedId,
  };
});
