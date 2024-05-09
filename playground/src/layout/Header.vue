<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { generateCSS } from "@bernankez/theme-generator";
import CodeDialog from "../components/CodeDialog.vue";
import { useThemeStore } from "../store/theme";

const { theme } = storeToRefs(useThemeStore());

const css = computed(() => generateCSS(theme.value));

const cssCode = computed(() => {
  return `${css.value.light}\n\n${css.value.dark}`;
});

const openNODE = ref(false);
const openJSON = ref(false);
// const openUnoCSS = ref(false);
const openCSS = ref(false);
</script>

<template>
  <header class="flex items-center justify-between px-2 py-3 font-mono">
    <div class="text-2xl">
      theme-generator
    </div>
    <div class="flex select-none items-center gap-3">
      <div class="cursor-default hover:underline hover:underline-2" @click="openNODE = true">
        NODE
      </div>
      <CodeDialog v-model="openNODE" :show-download="false" code="npm i @bernankez/theme-generator" lang="sh">
        <template #title>
          NODE
        </template>
      </CodeDialog>
      <div class="cursor-default hover:underline hover:underline-2" @click="openJSON = true">
        JSON
      </div>
      <CodeDialog v-model="openJSON" :code="JSON.stringify(theme, null, 2)" lang="json">
        <template #title>
          JSON
        </template>
      </CodeDialog>
      <!-- <div class="cursor-default hover:underline hover:underline-2" @click="openUnoCSS = true">
        UnoCSS
      </div>
      <CodeDialog v-model="openUnoCSS" filename="unocss.json" :code="JSON.stringify(themeValues.unocss, null, 2)" lang="json">
        <template #title>
          UnoCSS
        </template>
      </CodeDialog> -->
      <div class="cursor-default hover:underline hover:underline-2" @click="openCSS = true">
        CSS
      </div>
      <CodeDialog v-model="openCSS" :code="cssCode" lang="css">
        <template #title>
          CSS
        </template>
      </CodeDialog>
      <a href="https://github.com/Bernankez/theme-generator" class="cursor-default" title="GitHub" target="_blank">
        <div class="i-fa6-brands:github text-2xl"></div>
      </a>
    </div>
  </header>
</template>
