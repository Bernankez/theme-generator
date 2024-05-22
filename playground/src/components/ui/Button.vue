<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  icon?: any;
  title?: string;
  href?: string;
  target?: string;
  disabled?: boolean;
}>(), {
  target: "_blank",
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
</script>

<template>
  <component :is="as" :title v-bind="linkProps" class="box-border flex items-center gap-1.5 rounded-lg p-1.5 transition" :class="[disabled ? 'text-muted-foreground cursor-not-allowed' : 'text-primary  active:bg-neutral-200 hover:bg-neutral-100 dark:active:bg-neutral-700 dark:hover:bg-neutral-800 cursor-default']" @click="onClick">
    <div class="text-lg" :class="[icon]"></div>
    <slot></slot>
  </component>
</template>
