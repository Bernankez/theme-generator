import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import { type AcceptableTheme, defaultColors, defineTheme, generateStyle, inferThemeFromColor } from "@bernankez/theme-generator";

export const useThemeStore = defineStore("theme", () => {
  const cssPrefix = ref("");
  const themeColor = ref("rgb(193, 67, 68)");

  const defaults = computed(() => {
    if (themeColor.value) {
      return inferThemeFromColor(themeColor.value);
    }
    return defaultColors;
  });

  const overrides = ref<Partial<AcceptableTheme>>({});

  const theme = computed(() => defineTheme({
    cssPrefix: cssPrefix.value,
    defaults: defaults.value,
    overrides: overrides.value,
  }));

  const style = computed(() => generateStyle(theme.value));

  const writableTheme = ref(theme.value);

  watch([defaults, cssPrefix], () => {
    overrides.value = {};
  });

  watchEffect(() => {
    writableTheme.value = theme.value;
  });

  return {
    cssPrefix,
    themeColor,
    defaults,
    overrides,
    theme,
    writableTheme,
    style,
  };
});
