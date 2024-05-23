<script setup lang="ts">
import { computed, ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { useMergedState } from "@bernankez/utils/vue";

const props = withDefaults(defineProps<{
  direction?: "horizontal" | "vertical";
  resizeTriggerSize?: number;
  min?: number | string;
  max?: number | string;
}>(), {
  direction: "horizontal",
  resizeTriggerSize: 4,
  min: 0,
  max: 1,
});

const cursor = computed(() => props.direction === "vertical" ? "row-resize" : "col-resize");
const resizeWrapperStyle = computed(() => props.direction === "vertical"
  ? ({
      height: `${props.resizeTriggerSize}px`,
      width: "100%",
    })
  : ({
      width: `${props.resizeTriggerSize}px`,
      height: "100%",
    }));

const uncontrolledSize = ref(0.5);
const controlledSize = defineModel<string | number>("size");

const size = useMergedState(controlledSize, uncontrolledSize);

const offset = ref(0);
const slot1Style = computed(() => {
  const sizeValue = size.value;
  if (typeof sizeValue === "string") {
    return {
      flex: `0 0 ${sizeValue}`,
    };
  } else {
    const _size = sizeValue * 100;
    return {
      flex: `0 0 calc(${_size}% - ${
            (props.resizeTriggerSize * _size) / 100
          }px)`,
    };
  }
});

const resizeTriggerRef = ref<HTMLDivElement>();

const dragging = ref(false);

function onMouseDown(e: MouseEvent) {
  e.preventDefault();
  dragging.value = true;
  const bodyCursor = document.body.style.cursor;
  document.body.style.cursor = cursor.value;

  const offMouseMove = useEventListener(document, "mousemove", onMouseMove);
  const offMouseUp = useEventListener(document, "mouseup", onMouseUp);

  function onMouseMove(e: MouseEvent) {
    updateSize(e);
  }

  function onMouseUp(e: MouseEvent) {
    updateSize(e);
    offMouseMove();
    offMouseUp();
    dragging.value = false;
    document.body.style.cursor = bodyCursor;
  }

  const resizeTriggerEl = resizeTriggerRef.value;
  if (resizeTriggerEl) {
    const elRect = resizeTriggerEl.getBoundingClientRect();
    if (props.direction === "horizontal") {
      offset.value = e.clientX - elRect.left;
    } else {
      offset.value = elRect.top - e.clientY;
    }
  }
  updateSize(e);
}

function depx(px: string | number) {
  if (typeof px === "string") {
    if (px.endsWith("px")) {
      return Number(px.slice(0, px.length - 2));
    }
    return Number(px);
  }
  return px;
}

function updateSize(e: MouseEvent) {
  const containerRect = resizeTriggerRef.value?.parentElement?.getBoundingClientRect();
  if (!containerRect) {
    return;
  }
  const { direction } = props;
  const containerUsableWidth = containerRect.width - props.resizeTriggerSize;
  const containerUsableHeight
        = containerRect.height - props.resizeTriggerSize;
  const containerUsableSize
        = direction === "horizontal"
          ? containerUsableWidth
          : containerUsableHeight;

  const newPxSize
        = direction === "horizontal"
          ? e.clientX - containerRect.left - offset.value
          : e.clientY - containerRect.top + offset.value;

  const { min, max } = props;

  const pxMin
        = typeof min === "string" ? depx(min) : min * containerUsableSize;
  const pxMax
        = typeof max === "string" ? depx(max) : max * containerUsableSize;

  let nextPxSize = newPxSize;
  nextPxSize = Math.max(nextPxSize, pxMin);
  nextPxSize = Math.min(nextPxSize, pxMax, containerUsableSize);
  // in pixel mode
  if (typeof size.value === "string") {
    size.value = `${nextPxSize}px`;
  } else {
    // in percentage mode
    size.value = nextPxSize / containerUsableSize;
  }
}
</script>

<template>
  <div class="flex" :class="[direction === 'vertical' ? 'flex-col' : '']">
    <div :style="slot1Style" class="w-full overflow-auto">
      <slot name="1"></slot>
    </div>
    <div ref="resizeTriggerRef" class="shrink-0 grow-0" :style="{ ...resizeWrapperStyle, cursor }" @mousedown="onMouseDown">
      <slot name="resize-trigger">
        <div class="h-full w-full bg-foreground transition-200" :class="[dragging ? 'shadow-sm shadow-info bg-info!' : 'hover:shadow-sm hover:shadow-info hover:bg-info']"></div>
      </slot>
    </div>
    <div class="w-full overflow-auto">
      <slot name="2"></slot>
    </div>
  </div>
</template>
