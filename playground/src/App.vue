<script setup lang="ts">
import type { Scheme } from "@bernankez/theme-generator";
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

const { writableTheme, style, cssPrefix, overrides } = storeToRefs(useThemeStore());

watchEffect(() => {
  for (const key in style.value[scheme.value]) {
    document.documentElement.style.setProperty(key, style.value[scheme.value][key]);
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
