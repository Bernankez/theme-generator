<script setup lang="ts">
import type { AcceptableTheme, Scheme } from "@bernankez/theme-generator";
import { defaultColors, defineTheme, inferThemeFromColor, transformTailwind, transformUnoCSS } from "@bernankez/theme-generator";
import { computed, ref, watch, watchEffect } from "vue";
import ThemePalette from "./components/ThemePalette.vue";
import Header from "./layout/Header.vue";
import { isDark } from "./shared/isDark";

const scheme = computed<Scheme>({
  get: () => {
    if (isDark.value) {
      return "dark";
    }
    return "light";
  },
  set: (dark) => {
    isDark.value = dark === "dark";
  },
});
const cssPrefix = ref("");
const themeColor = ref("rgb(193, 67, 68)");

const defaults = computed(() => {
  if (themeColor.value) {
    return inferThemeFromColor(themeColor.value);
  }
  return defaultColors;
});

const overrides = ref<Partial<AcceptableTheme>>({});

const themeValues = computed(() => defineTheme({
  cssPrefix: cssPrefix.value,
  defaults: defaults.value,
  overrides: overrides.value,
  transformers: [transformTailwind(), transformUnoCSS()],
}));
const theme = ref(themeValues.value.theme);

watch([defaults, cssPrefix], () => {
  overrides.value = {};
});

watchEffect(() => {
  theme.value = themeValues.value.theme;
});
</script>

<template>
  <div>
    <Header :css="themeValues.css[scheme]" :json="JSON.stringify(theme, null, 2)" />
    <ThemePalette v-model:scheme="scheme" v-model:cssPrefix="cssPrefix" :model-value="theme" @update:model-value="json => overrides = json" />
  </div>
</template>
