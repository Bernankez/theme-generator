<script setup lang="ts">
import { computed } from "vue";
import { useClipboard } from "@vueuse/core";
import { useHighlighter } from "../composables/useHighlighter";
import Button from "./ui/Button.vue";

const props = withDefaults(defineProps<{
  code?: string;
  lang?: string;
  showCopy?: boolean;
}>(), {
  showCopy: true,
});

const source = computed(() => props.code || "");
const { copy, copied } = useClipboard({ source });

const { codeToHtml } = useHighlighter();
const html = computed(() => codeToHtml(props.code, props.lang));
</script>

<template>
  <div class="relative rounded-lg bg-neutral-50 dark:bg-neutral-900">
    <div class="code max-h-80vh overflow-y-auto p-2" v-html="html.value"></div>
    <Button :icon="['text-sm', copied ? 'i-lucide:check' : 'i-lucide:copy']" class="absolute right-4 top-1 text-sm font-mono" @click="() => copy()">
      {{ copied ? 'Copied' : 'Copy' }}
    </Button>
  </div>
</template>

<style scoped>
.code :deep(pre) {
  background-color: transparent !important;
  outline: none;
}
</style>
