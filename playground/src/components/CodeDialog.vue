<script setup lang="ts">
import { computed } from "vue";
import { useClipboard } from "@vueuse/core";
import { useHighlighter } from "../composables/useHighlighter";
import Button from "./ui/Button.vue";
import Dialog from "./ui/Dialog.vue";

const props = withDefaults(defineProps<{
  code?: string;
  lang?: string;
  filename?: string;
  showDownload?: boolean;
  showCopy?: boolean;
}>(), {
  showDownload: true,
  showCopy: true,
});

const source = computed(() => props.code || "");

const { copy, copied } = useClipboard({ source });
function download() {
  if (!props.code) {
    return;
  }
  const text = props.code;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = props.filename || `theme.${props.lang}`;
  a.click();
  URL.revokeObjectURL(url);
}

const show = defineModel<boolean>();

const { codeToHtml } = useHighlighter();
const html = computed(() => codeToHtml(props.code, props.lang));
</script>

<template>
  <Dialog v-model="show">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #close>
      <div class="flex items-center">
        <Button v-if="showDownload" icon="i-lucide:cloud-download text-sm" class="text-sm font-mono" @click="download">
          Download
        </Button>
        <Button v-if="showCopy" :icon="['text-sm', copied ? 'i-lucide:check' : 'i-lucide:copy']" class="text-sm font-mono" @click="() => copy()">
          {{ copied ? 'Copied' : 'Copy' }}
        </Button>
        <Button icon="i-lucide:x" @click="show = false" />
      </div>
    </template>
    <div class="rounded-lg bg-neutral-50">
      <div class="code max-h-80vh overflow-y-auto p-2" v-html="html.value"></div>
    </div>
  </Dialog>
</template>

<style scoped>
.code :deep(pre) {
  background-color: transparent !important;
  outline: none;
}
</style>
