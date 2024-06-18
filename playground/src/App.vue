<script setup lang="ts">
import type { Scheme } from "@bernankez/theme-generator";
import { computed, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { Notivue, NotivueSwipe } from "notivue";
import type { NotivueItem } from "notivue";
import type { SimpleNotificationProps } from "./components/SimpleNotification.vue";
import SimpleNotification from "./components/SimpleNotification.vue";
import ThemePalette from "./components/ThemePalette.vue";
import Website from "./components/Website.vue";
import Header from "./layout/Header.vue";
import { isDark } from "./shared/isDark";
import { useThemeStore } from "./store/theme";
import Split from "./components/ui/Split.vue";
import { usePreset } from "./composables/usePreset";

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

const { writableTheme, cssPrefix } = storeToRefs(useThemeStore());
const { style } = usePreset("none");

const websiteWrapperRef = ref<HTMLDivElement>();

watchEffect(() => {
  if (!websiteWrapperRef.value) {
    return;
  }
  let _style = { ...style.value?.[scheme.value] };
  if (scheme.value === "dark") {
    _style = { ...style.value?.light, ..._style };
  }
  for (const key in _style) {
    websiteWrapperRef.value.style.setProperty(key, _style[key]);
  }
});

const { sm } = useBreakpoints(breakpointsTailwind);
</script>

<template>
  <Split class="h-screen overflow-hidden" :direction="sm ? undefined : 'vertical'" :size="0.4" :min="0" :max="1">
    <template #1>
      <div ref="websiteWrapperRef">
        <Website />
      </div>
    </template>
    <template #2>
      <Header class="sticky top-0 z-1" />
      <ThemePalette v-model:scheme="scheme" v-model:cssPrefix="cssPrefix" v-model="writableTheme" />
    </template>
  </Split>
  <Notivue v-slot="item">
    <NotivueSwipe :item="item">
      <SimpleNotification :item="item as NotivueItem<SimpleNotificationProps>" />
    </NotivueSwipe>
  </Notivue>
</template>
