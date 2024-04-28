<script setup lang="ts">
import { computed } from "vue";
import { useClipboard } from "@vueuse/core";
import type { Scheme } from "@bernankez/theme-generator";
import { useHighlighter } from "../composables/useHighlighter";
import Icon from "./Icon.vue";
import Dialog from "./Dialog.vue";

const props = defineProps<{
  scheme: Scheme;
  code?: string;
  lang?: string;
}>();

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
  a.download = `theme.${props.scheme}.${props.lang}`;
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
        <Icon @click="download">
          <div class="flex items-center gap-2 text-sm">
            <div class="i-lucide:cloud-download"></div>
            <span class="font-mono">Download</span>
          </div>
        </Icon>
        <Icon @click="copy">
          <div class="flex items-center gap-2 text-sm">
            <div :class="copied ? 'i-lucide:check' : 'i-lucide:copy'"></div>
            <span class="font-mono">{{ copied ? 'Copied' : 'Copy' }}</span>
          </div>
        </Icon>
        <Icon icon="i-lucide:x" @click="show = false" />
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
