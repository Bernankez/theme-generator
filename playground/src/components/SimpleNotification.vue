<script setup lang="ts">
import type { NotivueItem } from "notivue";
import type { Awaitable } from "@vueuse/core";
import Button from "./ui/Button.vue";

export interface SimpleNotificationProps {
  undoFn?: () => Awaitable<void>;
}

defineProps<{
  item: NotivueItem<SimpleNotificationProps>;
}>();
</script>

<template>
  <div :key="item.duplicateCount" class="relative flex items-center gap-4 overflow-hidden rounded-full bg-primary px-2 py-1.5 text-primary-foreground shadow-lg">
    <div class="truncate font-mono">
      {{ item.message }}
    </div>
    <Button
      v-if="item.props.undoFn" class="bg-background py-1 rounded-full!" @click="async () => {
        await item.props.undoFn?.();
        item.clear();
      }"
    >
      Undo
    </Button>
    <div v-else class="i-lucide:circle-x shrink-0 text-lg" @click="item.clear"></div>
  </div>
</template>
