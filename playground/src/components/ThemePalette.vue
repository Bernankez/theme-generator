<script setup lang="ts">
import { defaultColors, defineTheme, isColor, isShape, kebabCase } from "@bernankez/theme-generator";
import { ref } from "vue";
import Palette from "./Palette.vue";

const colorScheme = ref<"dark" | "light">("light");

const theme = ref(defineTheme({
  // themeColor: "rgb(193, 67, 68)",
  defaults: defaultColors,
}));
</script>

<template>
  <div class="b-0 b-t-1 b-light b-solid">
    <div v-for="(_, key) in theme" :key="key" class="flex items-center b-0 b-b-1 b-light b-solid px-2 py-1">
      <div class="w-50 shrink-0 text-sm font-mono">
        {{ key }}
      </div>
      <div class="text-xs font-mono opacity-60">
        <div>
          Class name:
          <code class="rounded-lg bg-neutral-2 px-1.5 py-0.5">bg-{{ kebabCase(key) }}</code>
        </div>
        <div class="mt-2">
          CSS variable:
          <code class="rounded-lg bg-neutral-2 px-1 py-0.5">var(--{{ kebabCase(key) }})</code>
        </div>
      </div>
      <div class="flex-auto"></div>
      <div class="shrink-0">
        <div v-if="isColor(key)" class="flex items-center gap-2">
          <input v-model="theme[key][colorScheme]" class="b-none bg-transparent text-right font-mono outline-none" :style="{ color: theme[key][colorScheme] }" />
          <Palette v-model="theme[key][colorScheme]" />
        </div>
        <div v-if="isShape(key)">
          <input v-model="theme[key]" class="b-none bg-transparent text-right font-mono outline-none" />
        </div>
      </div>
    </div>
  </div>
</template>
