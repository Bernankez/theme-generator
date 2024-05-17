import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import { type AcceptableTheme, defaultColors, defaultPreset, defineTheme, inferThemeFromColor, shadcnPreset } from "@bernankez/theme-generator";

export const useThemeStore = defineStore("theme", () => {
  const cssPrefix = ref("");
  const themeColor = ref("rgb(193, 67, 68)");
  const presets = {
    default: defaultPreset,
    shadcn: shadcnPreset,
  };
  const presetKeys = ref(Object.keys(presets) as (keyof typeof presets)[]);
  const preset = ref<keyof typeof presets>("default");

  const defaults = computed(() => {
    if (themeColor.value) {
      return inferThemeFromColor(themeColor.value);
    }
    return defaultColors;
  });

  const overrides = ref<Partial<AcceptableTheme>>({});

  const _theme = computed(() => defineTheme({
    cssPrefix: cssPrefix.value,
    defaults: defaults.value,
    overrides: overrides.value,
  }));

  const _preset = computed(() => {
    const presetFn = presets[preset.value];
    return presetFn(_theme.value, {
      cssPrefix: cssPrefix.value,
    });
  });
  const theme = computed(() => _preset.value.theme);
  const style = computed(() => _preset.value.style);
  const unocss = computed(() => _preset.value.unocss);
  const tailwind = computed(() => _preset.value.tailwind);

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
    unocss,
    tailwind,
    preset,
    presetKeys,
  };
});
