<script setup lang="ts">
import { ref } from "vue";
import { useElementHover } from "@vueuse/core";
import Palette from "./ui/Palette.vue";
import Background from "./Background/Background.vue";
import { useViewTransition } from "@/composables/useViewTransition";

const show = defineModel({
  default: false,
});

const buttonRef = ref<HTMLDivElement>();
const isHover = useElementHover(buttonRef);

const { concentrate } = useViewTransition();

function onPick(event: MouseEvent) {
  concentrate(event.clientX, event.clientY, (classList) => {
    classList.remove("fullscreen-color-picker");
    show.value = false;
  });
}
</script>

<template>
  <div v-if="show" class="absolute bottom-0 left-0 right-0 top-0 z-1 bg-background">
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
