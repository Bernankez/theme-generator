<script setup lang="ts">
import { watchEffect } from "vue";
import { useMod } from "./useMod";

const props = withDefaults(defineProps<{
  animate?: boolean;
}>(), {
  animate: true,
});

const { mod, stop, start } = useMod();

watchEffect(() => {
  if (props.animate) {
    start();
  } else {
    stop();
  }
});
</script>

<template>
  <div class="background h-full w-full" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style scoped>
.background {
  background-image: radial-gradient(
      at 40% 20%,
      hsla(calc(v-bind("mod") + 28), 100%, 74%, 0.4) 20px,
      transparent 70%
    ),
    radial-gradient(
      at 80% 0%,
      hsla(calc(v-bind("mod") + 189), 100%, 56%, 0.4) 20px,
      transparent 70%
    ),
    radial-gradient(
      at 0% 50%,
      hsla(calc(v-bind("mod") + 355), 100%, 93%, 0.4) 20px,
      transparent 70%
    ),
    radial-gradient(
      at 80% 50%,
      hsla(calc(v-bind("mod") + 340), 100%, 76%, 0.4) 20px,
      transparent 70%
    ),
    radial-gradient(
      at 0% 100%,
      hsla(calc(v-bind("mod") + 22), 100%, 77%, 0.4) 20px,
      transparent 70%
    ),
    radial-gradient(
      at 80% 100%,
      hsla(calc(v-bind("mod") + 242), 100%, 70%, 0.4) 20px,
      transparent 70%
    ),
    radial-gradient(
      at 0% 0%,
      hsla(calc(v-bind("mod") + 343), 100%, 76%, 0.4) 20px,
      transparent 70%
    );
}
</style>
