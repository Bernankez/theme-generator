<script setup lang="ts">
import type { Scheme } from "@bernankez/theme-generator";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import ThemePalette from "./components/ThemePalette.vue";
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

const { theme, cssPrefix, overrides } = storeToRefs(useThemeStore());
</script>

<template>
  <div>
    <Header />
    <ThemePalette v-model:scheme="scheme" v-model:cssPrefix="cssPrefix" :model-value="theme" @update:model-value="json => overrides = json" />
  </div>
</template>
