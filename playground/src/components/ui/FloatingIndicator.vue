<script setup lang="ts">
import { useMergedState } from "@bernankez/utils/vue";
import { computed, ref, watch } from "vue";

const props = withDefaults(defineProps<{
  data?: { label: string | number;key: string | number }[];
  keepSelected?: boolean;
}>(), {
  keepSelected: true,
});

const uncontrolled = ref<string | number>();
const controlled = defineModel<string | number>();
const active = useMergedState(controlled, uncontrolled);

watch(() => props.data, (data, oldData) => {
  if (oldData && data && active.value) {
    if (data.find(item => item.key === active.value) && props.keepSelected) {
      // Keep previous value
    } else {
      // Reset to first value
      active.value = data[0].key;
    }
  } else {
    active.value = data?.[0].key;
  }
}, { immediate: true });

const width = computed(() => `${(100 / (props.data?.length || 1))}%`);
const translateX = computed(() => {
  const activeIndex = props.data?.findIndex(item => item.key === active.value) || 0;
  return `${activeIndex * 100}%`;
});
</script>

<template>
  <div class="relative rounded-md bg-secondary text-secondary-foreground">
    <div class="absolute h-full rounded-md p-1 transition-300" :style="{ width, transform: `translateX(${translateX})` }">
      <div class="h-full w-full rounded-md bg-primary"></div>
    </div>
    <div class="flex py-2">
      <div v-for="item in data" :key="item.key" class="z-1 w-full cursor-default select-none text-center transition-300" :class="[active === item.key ? ' text-primary-foreground font-bold' : 'text-secondary-foreground']" @click="() => active = item.key">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
