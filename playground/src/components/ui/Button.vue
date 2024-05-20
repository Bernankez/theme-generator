<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  icon?: any;
  title?: string;
  href?: string;
  target?: string;
}>(), {
  target: "_blank",
});

const as = computed(() => props.href ? "a" : "div");
const linkProps = computed(() => as.value === "a" ? ({ href: props.href, target: props.target }) : ({}));
</script>

<template>
  <component :is="as" :title v-bind="linkProps" class="box-border flex cursor-default items-center gap-1.5 rounded-lg p-1.5 text-primary transition active:bg-neutral-200 hover:bg-neutral-100 dark:active:bg-neutral-700 dark:hover:bg-neutral-800">
    <div class="text-lg" :class="[icon]"></div>
    <slot></slot>
  </component>
</template>
