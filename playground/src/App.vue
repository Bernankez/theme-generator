<script setup lang="ts">
import { computed, provide, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { Notivue, NotivueSwipe } from "notivue";
import type { NotivueItem } from "notivue";
import type { SimpleNotificationProps } from "./components/SimpleNotification.vue";
import SimpleNotification from "./components/SimpleNotification.vue";
import ThemePalette from "./components/ThemePalette.vue";
import Website from "./components/Website.vue";
import Header from "./layout/Header.vue";
import { scheme } from "./shared/isDark";
import Split from "./components/ui/Split.vue";
import { usePreset } from "./composables/usePreset";
import { useAppStore } from "./store/app";
import { useTemplate } from "./composables/useTemplate";
import { showColorPickerKey } from "./injections";
import FullscreenColorPicker from "@/components/FullscreenColorPicker.vue";

const { splitSize } = storeToRefs(useAppStore());

const { currentTemplate, updateTemplate, importTemplateFromLink } = useTemplate();

const url = new URL(location.href);
const template = url.searchParams.get("template");
if (template) {
  importTemplateFromLink(JSON.parse(template));
}

const { style } = usePreset("none");

const websiteWrapperRef = ref<HTMLDivElement>();

const cssPrefix = computed({
  get: () => currentTemplate.value.cssPrefix,
  set: (cssPrefix) => {
    updateTemplate({ ...currentTemplate.value, cssPrefix });
  },
});

watchEffect((onCleanup) => {
  if (!websiteWrapperRef.value) {
    return;
  }
  onCleanup(() => {
    if (websiteWrapperRef.value) {
      websiteWrapperRef.value.removeAttribute("style");
    }
  });
  let _style = { ...style.value?.[scheme.value] };
  if (scheme.value === "dark") {
    _style = { ...style.value?.light, ..._style };
  }
  if (cssPrefix.value) {
    for (const key in _style) {
      websiteWrapperRef.value.style.setProperty(key.replace(`${cssPrefix.value}-`, ""), `var(${key})`);
      const value = _style[key];
      // if the value is a css variable and it's not using the current css prefix, skip
      if (/^var\(([^)]+)\)$/.test(value) && !value.includes(cssPrefix.value)) {
        continue;
      }
      websiteWrapperRef.value.style.setProperty(key, value);
    }
  } else {
    for (const key in _style) {
      websiteWrapperRef.value.style.setProperty(key, _style[key]);
    }
  }
});

const { sm } = useBreakpoints(breakpointsTailwind);

const theme = computed({
  get: () => currentTemplate.value.theme,
  set: (theme) => {
    updateTemplate({ ...currentTemplate.value, theme });
  },
});

const showColorPicker = ref(false);
provide(showColorPickerKey, showColorPicker);
</script>

<template>
  <Split v-model:size="splitSize" class="h-screen overflow-hidden" :direction="sm ? undefined : 'vertical'" :min="0" :max="1">
    <template #1>
      <div ref="websiteWrapperRef">
        <Website />
      </div>
    </template>
    <template #2>
      <Header class="sticky top-0 z-1" />
      <ThemePalette v-model:scheme="scheme" v-model="theme" v-model:css-prefix="cssPrefix" />
    </template>
  </Split>
  <FullscreenColorPicker v-model="showColorPicker" />
  <Notivue v-slot="item">
    <NotivueSwipe :item="item">
      <SimpleNotification :item="item as NotivueItem<SimpleNotificationProps>" />
    </NotivueSwipe>
  </Notivue>
</template>
