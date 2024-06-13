<script setup lang="ts">
import { useDropZone } from "@vueuse/core";
import chroma from "chroma-js";
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{
  round?: boolean;
  draggable?: boolean;
  droppable?: boolean;
}>(), {
  draggable: true,
  droppable: true,
});

const color = defineModel<string>();

const dropZoneRef = ref<HTMLInputElement>();

useDropZone(dropZoneRef, {
  onDrop(_, e) {
    if (!props.droppable) {
      return;
    }
    if (e.dataTransfer?.getData("color")) {
      const c = e.dataTransfer.getData("color");
      if (c !== color.value) {
        color.value = e.dataTransfer.getData("color");
      }
    }
  },
});

function onDragStart(e: DragEvent) {
  e.dataTransfer?.setData("color", color.value || "");
}

function onDragOver(e: DragEvent) {
  if (!e.dataTransfer) {
    return;
  }
  if (!props.droppable) {
    e.dataTransfer.dropEffect = "none";
  } else {
    e.dataTransfer.dropEffect = "copy";
  }
}

const standardColor = computed({
  get: () => {
    try {
      return color.value && chroma(color.value).hex();
    } catch (e) {
      console.error(e);
      return "";
    }
  },
  set: c => color.value = c,
});
</script>

<template>
  <input ref="dropZoneRef" v-model="standardColor" :draggable="draggable ? 'true' : 'false'" type="color" class="h-8 w-7 b-none bg-transparent p-0 outline-none" :class="[round && 'palette']" @dragstart="onDragStart" @dragover="onDragOver" />
</template>

<style scoped>
.palette::-webkit-color-swatch {
  border-radius: 999px;
}

.palette::-moz-color-swatch {
  border-radius: 999px;
}
</style>
