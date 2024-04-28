<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string;
  title?: string;
  href?: string;
  target?: string;
  showWrapper?: boolean;
}>(), {
  target: "_blank",
  showWrapper: true,
});
</script>

<template>
  <a v-if="showWrapper" :href="href" :target="target" :title="title" class="box-border flex cursor-default rounded-lg p-1.5 transition active:bg-neutral-200 hover:bg-neutral-100">
    <slot>
      <div class="text-lg" :class="[icon]"></div>
    </slot>
  </a>
  <slot v-else>
    <div class="text-lg" :class="[icon]"></div>
  </slot>
</template>
