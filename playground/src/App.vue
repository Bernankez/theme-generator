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
  let _style = { ...style.value[scheme.value] };
  if (scheme.value === "dark") {
    _style = { ...style.value.light, ..._style };
  }
  for (const key in _style) {
    document.documentElement.style.setProperty(key, _style[key]);
  }
});
</script>

<template>
  <div class="h-screen flex">
    <div class="w-full overflow-auto">
      <Website class="h-full" />
    </div>
    <div class="w-full overflow-auto b-0 b-l-1 b-muted b-solid">
      <Header />
      <ThemePalette v-model:scheme="scheme" v-model:cssPrefix="cssPrefix" :model-value="writableTheme" @update:model-value="json => overrides = json" />
    </div>
  </div>
</template>
