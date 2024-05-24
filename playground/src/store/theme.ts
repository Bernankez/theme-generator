import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";
import { defaultColors, defineTheme, inferThemeFromColor } from "@bernankez/theme-generator";
import { n } from "@bernankez/utils";

export const useThemeStore = defineStore("theme", () => {
  const cssPrefix = ref("");
  const themeColor = ref("#c14344");
  const modeOptions = computed(() => n([
    {
      label: "default",
      value: "default",
    },
    {
      label: themeColor.value,
      value: "infer",
    },
  ]));
  const mode = ref<typeof modeOptions["value"][number]["value"]>("default");
  const defaults = computed(() => {
    if (mode.value === "infer") {
      return inferThemeFromColor(themeColor.value);
    }
    return defaultColors;
  });
  const theme = computed(() => defineTheme({
    cssPrefix: cssPrefix.value,
    defaults: defaults.value,
  }));
  const writableTheme = ref(theme.value);

  watchEffect(() => {
    writableTheme.value = theme.value;
  });

  return {
    cssPrefix,
    themeColor,
    defaults,
    theme,
    writableTheme,
    modeOptions,
    mode,
  };
});
