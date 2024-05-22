<script setup lang="ts">
import { computed } from "vue";
import { useClipboard } from "@vueuse/core";
import { useHighlighter } from "../composables/useHighlighter";
import Button from "./ui/Button.vue";

const props = withDefaults(defineProps<{
  code?: string;
  lang?: string;
  showCopy?: boolean;
  showLang?: boolean;
}>(), {
  showCopy: true,
  showLang: true,
});

const source = computed(() => props.code || "");
const { copy, copied } = useClipboard({ source });

const { codeToHtml } = useHighlighter();
const html = computed(() => codeToHtml(props.code, props.lang));
</script>

<template>
  <div class="group relative rounded-lg bg-neutral-50 dark:bg-neutral-900">
    <div class="code max-h-80vh overflow-y-auto p-2" v-html="html.value"></div>
    <div v-if="showLang" class="absolute right-4 top-0 text-sm text-muted-foreground font-mono opacity-100 transition group-hover:opacity-0">
      {{ lang }}
    </div>
    <Button v-if="showCopy" :icon="['text-sm', copied ? 'i-lucide:check' : 'i-lucide:copy']" class="absolute right-4 top-1 bg-neutral-50 text-sm font-mono opacity-0 group-hover:opacity-100" @click="() => copy()">
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
