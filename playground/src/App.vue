<script setup lang="ts">
import type { AcceptableTheme, Scheme } from "@bernankez/theme-generator";
import { defaultColors, defineTheme, inferThemeFromColor } from "@bernankez/theme-generator";
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

const theme = computed(() => defineTheme({
  cssPrefix: cssPrefix.value,
  defaults: defaults.value,
  overrides: overrides.value,
}));
const json = ref(theme.value.json);

watch([defaults, cssPrefix], () => {
  overrides.value = {};
});

watchEffect(() => {
  json.value = theme.value.json;
});
</script>

<template>
  <div>
    <Header :css="theme.css[scheme]" :json="JSON.stringify(json, null, 2)" />
    <ThemePalette v-model:scheme="scheme" v-model:cssPrefix="cssPrefix" :model-value="json" @update:model-value="json => overrides = json" />
  </div>
</template>
