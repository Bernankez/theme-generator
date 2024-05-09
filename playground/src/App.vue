<script setup lang="ts">
import { type Scheme, hexToRGB, isColor, isShape, kebabCase } from "@bernankez/theme-generator";
import type { CSSProperties } from "vue";
import { computed, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import ThemePalette from "./components/ThemePalette.vue";
import Website from "./components/Website.vue";
import Header from "./layout/Header.vue";
import { isDark } from "./shared/isDark";
import { useThemeStore } from "./store/theme";

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

const { writableTheme, theme, cssPrefix, overrides } = storeToRefs(useThemeStore());

const themeStyle = computed(() => {
  const style: CSSProperties = {};
  for (const key of Object.keys(theme.value.colors).concat(Object.keys(theme.value).filter(key => key !== "colors"))) {
    if (isColor(key)) {
      style[`--${kebabCase(key)}`] = [...hexToRGB(theme.value.colors[key][scheme.value])].join(" ");
    } else if (isShape(key)) {
      style[`--${kebabCase(key)}`] = theme.value[key];
    }
  }
  return style;
});

watchEffect(() => {
  for (const key in themeStyle.value) {
    document.documentElement.style.setProperty(key, themeStyle.value[key as keyof CSSProperties] as any);
  }
});
</script>

<template>
  <div class="flex">
    <div>
      <Website />
    </div>
    <div>
      <Header />
      <ThemePalette v-model:scheme="scheme" v-model:cssPrefix="cssPrefix" :model-value="writableTheme" @update:model-value="json => overrides = json" />
    </div>
  </div>
</template>
