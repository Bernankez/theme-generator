<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { computed } from "vue";

const props = withDefaults(defineProps<{
  icon?: any;
  title?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
  autoCollapse?: boolean;
  collapsePoint?: "sm" | "md" | "lg" | "xl" | "2xl";
}>(), {
  target: "_blank",
  autoCollapse: true,
  collapsePoint: "sm",
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const as = computed(() => props.href ? "a" : "div");
const linkProps = computed(() => as.value === "a" ? ({ href: props.href, target: props.target }) : ({}));

function onClick(e: MouseEvent) {
  if (props.disabled) {
    return;
  }
  emit("click", e);
}

const breakpoints = useBreakpoints(breakpointsTailwind);
</script>

<template>
  <component :is="as" :title v-bind="linkProps" class="box-border flex items-center gap-1.5 rounded-lg p-1.5 transition" :class="[disabled ? 'text-muted-foreground cursor-not-allowed' : 'text-primary  active:bg-neutral-200 hover:bg-neutral-100 dark:active:bg-neutral-700 dark:hover:bg-neutral-800 cursor-default']" @click="onClick">
    <div class="text-lg" :class="[icon]"></div>
    <slot v-if="breakpoints[collapsePoint].value"></slot>
  </component>
</template>
