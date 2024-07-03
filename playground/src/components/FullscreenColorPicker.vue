<script setup lang="ts">
import { ref } from "vue";
import { useElementHover } from "@vueuse/core";
import { nanoid } from "nanoid";
import { storeToRefs } from "pinia";
import { inferThemeFromColor } from "@bernankez/theme-generator";
import Palette from "./ui/Palette.vue";
import Background from "./Background/Background.vue";
import { useViewTransition } from "@/composables/useViewTransition";
import { useTemplate } from "@/composables/useTemplate";
import { useAppStore } from "@/store/app";

const show = defineModel({
  default: false,
});

const buttonRef = ref<HTMLDivElement>();
const isHover = useElementHover(buttonRef);

const { configVersion } = storeToRefs(useAppStore());
const { addTemplate, setCurrentTemplate } = useTemplate();
const themeColor = ref<string>("#c14344");

const { concentrate } = useViewTransition();

function onPick(event: MouseEvent) {
  const theme = inferThemeFromColor(themeColor.value);
  const _id = nanoid();
  addTemplate({
    _id: nanoid(),
    version: configVersion.value,
    name: themeColor.value,
    _editable: true,
    _removable: true,
    theme,
  });
  setCurrentTemplate(_id);
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
        <Palette v-model="themeColor" round class="h-30! w-29!" />
        <div ref="buttonRef" role="button" class="flex select-none items-center gap-2 rounded-xl px-5 py-3 text-3xl font-bold italic transition transition-500 cursor-default! hover:bg-background hover:bg-opacity-30" @click="onPick">
          <div class="i-lucide:wand"></div>
          <span>PICK</span>
        </div>
      </div>
    </div>
  </div>
</template>
