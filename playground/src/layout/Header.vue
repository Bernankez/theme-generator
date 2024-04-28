<script setup lang="ts">
import { ref } from "vue";
import type { Scheme } from "@bernankez/theme-generator";
import CodeDialog from "../components/CodeDialog.vue";

const props = withDefaults(defineProps<{
  scheme?: Scheme;
  css?: string;
  json?: string;
}>(), {
  scheme: "light",
});

const openJSON = ref(false);
const openCSS = ref(false);
</script>

<template>
  <header class="flex items-center justify-between px-2 py-3 font-mono">
    <div class="text-2xl">
      theme-generator
    </div>
    <div class="flex items-center gap-3">
      <div class="cursor-default hover:underline hover:underline-2" @click="openJSON = true">
        JSON
      </div>
      <CodeDialog v-model="openJSON" :scheme="scheme" :code="props.json" lang="json">
        <template #title>
          JSON
        </template>
      </CodeDialog>
      <div class="cursor-default hover:underline hover:underline-2" @click="openCSS = true">
        CSS
      </div>
      <CodeDialog v-model="openCSS" :scheme="scheme" :code="props.css" lang="css">
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
