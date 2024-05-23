<script setup lang="ts" generic="T extends CommonTheme">
import type { Color, CommonTheme, Scheme } from "@bernankez/theme-generator";
import { kebabCase } from "@bernankez/theme-generator";
import { computed, ref } from "vue";
import { merge } from "lodash-es";
import { useDebounceFn, useManualRefHistory } from "@vueuse/core";
import Palette from "./ui/Palette.vue";
import Select from "./ui/Select.vue";
import Button from "./ui/Button.vue";

const json = defineModel<T>({
  required: true,
});

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

const { undo, redo, canRedo, canUndo, commit } = useManualRefHistory(json, {
  clone: true,
});

const debouncedCommit = useDebounceFn(commit);

function updateColor(key: string, color: string | Color) {
  const obj = merge({}, json.value, {
    colors: {
      [key]: {
        [scheme.value]: color,
      },
    },
  });
  json.value = obj;
  debouncedCommit();
}

function updateShape(key: string, shape: string) {
  const obj = merge({}, json.value, {
    [key]: shape,
  });
  json.value = obj;
  debouncedCommit();
}

function sync(key: string, triggerCommit = true) {
  if (json.value.colors[key].dark === json.value.colors[key].light) {
    return;
  }
  if (scheme.value === "dark") {
    json.value.colors[key].dark = json.value.colors[key].light;
  } else {
    json.value.colors[key].light = json.value.colors[key].dark;
  }
  triggerCommit && commit();
}

function syncAll() {
  for (const key in json.value.colors) {
    sync(key, false);
  }
  // trigger emit
  // eslint-disable-next-line no-self-assign
  json.value = json.value;
  commit();
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
        <Button icon="i-lucide:file-symlink" :title="`Sync from ${scheme === 'light' ? 'dark' : 'light'}`" @click="syncAll" />
      </div>
      <div class="ml-2 w-28 flex items-center justify-evenly">
        <Button :disabled="!canUndo" icon="i-lucide:undo-2" title="Undo" @click="undo" />
        <Button :disabled="!canRedo" icon="i-lucide:redo-2" title="Redo" @click="redo" />
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
        <Button icon="i-lucide:file-symlink" :title="`Sync from ${scheme === 'light' ? 'dark' : 'light'}`" @click="sync(key)" />
      </div>
      <div class="ml-2 w-28 shrink-0">
        <div v-if="key in json.colors" class="flex items-center gap-2">
          <input :value="json.colors[key][scheme]" class="w-full b-none bg-transparent text-right text-sm font-mono outline-none" @input="(e) => updateColor(key, (e.currentTarget as HTMLInputElement).value)" />
          <Palette :model-value="json.colors[key][scheme]" class="shrink-0" @update:model-value="(color) => updateColor(key, color)" />
        </div>
        <div v-else>
          <input :value="json[key as keyof T]" class="w-full b-none bg-transparent text-right text-sm font-mono outline-none" @input="(e) => updateShape(key, (e.currentTarget as HTMLInputElement).value)" />
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
