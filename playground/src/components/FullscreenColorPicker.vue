<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useElementHover } from "@vueuse/core";
import Palette from "./ui/Palette.vue";
import Background from "./Background/Background.vue";

const show = defineModel({
  default: true,
});

const buttonRef = ref<HTMLDivElement>();
const isHover = useElementHover(buttonRef);

async function onPick(event: MouseEvent) {
  if (document.startViewTransition) {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    const viewTransition = document.startViewTransition(() => {
      show.value = false;
    });

    await viewTransition.ready;

    const clipPath = [
        `circle(${endRadius}px at ${x}px ${y}px)`,
        `circle(0px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath,
      },
      {
        duration: 500,
        easing: "cubic-bezier(.16,.08,.25,1)",
        pseudoElement: "::view-transition-old(root)",
      },
    );
  }
}
</script>

<template>
  <div v-if="show" class="fullscreen-color-picker absolute bottom-0 left-0 right-0 top-0 z-1 bg-background">
    <div class="relative h-full w-full">
      <Background class="absolute left-0 top-0 transition transition-500 -z-1" :class="[isHover ? 'blur-30' : '']" />
      <div class="h-full w-full flex flex-col items-center justify-center gap-10">
        <Palette round class="h-30! w-29!" />
        <div ref="buttonRef" role="button" class="flex select-none items-center gap-2 px-5 py-3 text-3xl font-bold italic cursor-default!" @click="onPick">
          <div class="i-lucide:wand"></div>
          PICK
        </div>
      </div>
    </div>
  </div>
</template>
