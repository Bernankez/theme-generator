<script setup lang="ts">
import { ref } from "vue";
import CodeDialog from "../components/CodeDialog.vue";

const props = defineProps<{
  css?: string;
  json?: string;
}>();

const openNODE = ref(false);
const openJSON = ref(false);
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
      <CodeDialog v-model="openJSON" :code="props.json" lang="json">
        <template #title>
          JSON
        </template>
      </CodeDialog>
      <div class="cursor-default hover:underline hover:underline-2" @click="openCSS = true">
        CSS
      </div>
      <CodeDialog v-model="openCSS" :code="props.css" lang="css">
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
