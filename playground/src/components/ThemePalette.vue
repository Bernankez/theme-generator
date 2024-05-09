<script setup lang="ts">
import type { Color, Scheme, Theme } from "@bernankez/theme-generator";
import { isColor, isShape, kebabCase } from "@bernankez/theme-generator";
import { computed, ref, toRefs } from "vue";
import { merge } from "lodash-es";
import Palette from "./Palette.vue";
import Select from "./Select.vue";
import Icon from "./Icon.vue";

const props = defineProps<{
  modelValue: Theme;
}>();

const emit = defineEmits<{
  "update:modelValue": [json: Theme];
}>();

const { modelValue: json } = toRefs(props);

const scheme = defineModel<Scheme>("scheme", {
  default: "light" as Scheme,
});

const cssPrefix = defineModel("cssPrefix", {
  default: "",
});

const schemeOptions = ref([
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
]);

function updateColor(key: string, color: string | Color) {
  const obj = merge({}, json.value, {
    colors: {
      [key]: {
        [scheme.value]: color,
      },
    },
  });
  emit("update:modelValue", obj);
}

function updateShape(key: string, shape: string) {
  const obj = merge({}, json.value, {
    [key]: shape,
  });
  emit("update:modelValue", obj);
}

const jsonKeys = computed(() => Object.keys(json.value.colors).concat(Object.keys(json.value).filter(key => key !== "colors")));
</script>

<template>
  <div class="b-0 b-t-1 b-light b-solid">
    <div class="palette-row">
      <div class="w-50 shrink-0 text-sm">
        scheme
      </div>
      <div class="flex-auto"></div>
      <div class="text-sm">
        <Select v-model="scheme" :options="schemeOptions" />
      </div>
    </div>
    <div class="palette-row">
      <div class="w-50 shrink-0 text-sm">
        css prefix
      </div>
      <div class="flex-auto"></div>
      <div class="text-sm">
        <input v-model="cssPrefix" class="text-right outline-none" placeholder="cssPrefix" />
      </div>
    </div>
    <div class="palette-row font-bold">
      <div class="w-50 shrink-0">
        Name
      </div>
      <div>
        Example use
      </div>
      <div class="flex-auto"></div>
      <div>
        <Icon icon="i-lucide:file-symlink" :title="`Sync from ${scheme === 'light' ? 'dark' : 'light'}`" />
      </div>
      <div class="ml-2 w-28 flex items-center justify-evenly">
        <Icon icon="i-lucide:undo-2" title="Undo" />
        <Icon icon="i-lucide:redo-2" title="Redo" />
      </div>
    </div>
    <div v-for="key in jsonKeys" :key="key" class="palette-row">
      <div class="w-50 shrink-0 text-sm">
        {{ key }}
      </div>
      <div class="text-xs opacity-60">
        <!-- <div>
          Class name:
          <code class="rounded-lg bg-neutral-2 px-1.5 py-0.5">bg-{{ kebabCase(key) }}</code>
        </div> -->
        <div class="mt-2">
          CSS variable:
          <code class="rounded-lg bg-neutral-2 px-1 py-0.5">var(--{{ `${cssPrefix ? `${cssPrefix}-` : ''}${kebabCase(key)}` }})</code>
        </div>
      </div>
      <div class="flex-auto"></div>
      <div>
        <Icon icon="i-lucide:file-symlink" :title="`Sync from ${scheme === 'light' ? 'dark' : 'light'}`" />
      </div>
      <div class="ml-2 w-28 shrink-0">
        <div v-if="isColor(key)" class="flex items-center gap-2">
          <input :value="json.colors[key][scheme]" class="w-full b-none bg-transparent text-right text-sm font-mono outline-none" @input="(e) => updateColor(key, (e.currentTarget as HTMLInputElement).value)" />
          <Palette :model-value="json.colors[key][scheme]" class="shrink-0" @update:model-value="(color) => updateColor(key, color)" />
        </div>
        <div v-if="isShape(key)">
          <input :value="json[key]" class="w-full b-none bg-transparent text-right text-sm font-mono outline-none" @input="(e) => updateShape(key, (e.currentTarget as HTMLInputElement).value)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.palette-row {
  @apply font-mono flex items-center b-0 b-b-1 b-light b-solid px-2 py-1;
}
</style>
