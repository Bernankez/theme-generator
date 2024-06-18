<script setup lang="ts">
import type { NotivueItem } from "notivue";

export interface SimpleNotificationProps {
  isSimpleNotification: boolean;
}

defineProps<{
  item: NotivueItem<SimpleNotificationProps>;
}>();
</script>

<template>
  <div :key="item.duplicateCount" class="overflow-hidden rounded-full bg-primary shadow-lg">
    <div class="flex items-center gap-4 px-3 py-1.5 text-primary-foreground">
      <div class="truncate font-mono">
        {{ item.message }}
      </div>
      <div class="i-lucide:circle-x shrink-0 text-lg" @click="item.clear"></div>
    </div>
  </div>
</template>
