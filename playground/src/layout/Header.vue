<script setup lang="ts">
import { ref } from "vue";
import Button from "../components/ui/Button.vue";
import ExportDialog from "../components/ExportDialog.vue";

const showExport = ref(false);
</script>

<template>
  <header class="flex items-center justify-between gap-3 px-2 py-3 font-mono">
    <div class="text-2xl">
      theme-generator
    </div>
    <div class="flex select-none items-center gap-3">
      <Button icon="i-lucide:zap" @click="showExport = true">
        Generate
      </Button>
      <ExportDialog v-model="showExport" />
      <a href="https://github.com/Bernankez/theme-generator" class="cursor-default" title="GitHub" target="_blank">
        <div class="i-fa6-brands:github text-2xl"></div>
      </a>
    </div>
  </header>
</template>
