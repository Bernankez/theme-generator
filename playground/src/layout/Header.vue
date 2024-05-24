<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "../components/ui/Button.vue";
import Select from "../components/ui/Select.vue";
import ExportDialog from "../components/ExportDialog.vue";
import { useThemeStore } from "../store/theme";
import Palette from "../components/ui/Palette.vue";

const { themeColor, mode, modeOptions: options } = storeToRefs(useThemeStore());

const showExport = ref(false);
</script>

<template>
  <header class="flex items-center justify-between gap-3 px-2 py-3 font-mono">
    <div class="text-2xl">
      theme-generator
    </div>
    <div class="flex select-none items-center gap-3">
      <Palette v-if="mode === 'infer'" v-model="themeColor" round />
      <Select v-model="mode" :options />
      <Button icon="i-lucide:zap" title="Generate" @click="showExport = true">
        Generate
      </Button>
      <ExportDialog v-model="showExport" />
      <a href="https://github.com/Bernankez/theme-generator" class="cursor-default" title="GitHub" target="_blank">
        <div class="i-fa6-brands:github text-2xl"></div>
      </a>
    </div>
  </header>
</template>
