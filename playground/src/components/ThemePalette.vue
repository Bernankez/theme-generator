<script setup lang="ts">
import type { Scheme } from "@bernankez/theme-generator";
import { defineTheme, inferThemeFromColor, isColor, isShape, kebabCase } from "@bernankez/theme-generator";
import { computed, ref } from "vue";
import Palette from "./Palette.vue";
import Select from "./Select.vue";

const schemeOptions = ref([
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
]);
const scheme = ref<Scheme>("light");

const cssPrefix = ref("hah");

const defaults = computed(() => inferThemeFromColor("rgb(193, 67, 68)"));

const theme = computed(() => defineTheme({
  cssPrefix: cssPrefix.value,
  defaults: defaults.value,
}));

const json = theme.value.json;
console.log(theme.value.css.light);
console.log(theme.value.css.dark);
// TODO headless ui for dialog
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
    <div class="palette-row font-bold">
      <div class="w-50 shrink-0">
        Color name
      </div>
      <div>
        Example use
      </div>
      <div class="flex-auto"></div>
    </div>
    <div v-for="(_, key) in json" :key="key" class="palette-row">
      <div class="w-50 shrink-0 text-sm">
        {{ key }}
      </div>
      <div class="text-xs opacity-60">
        <div>
          Class name:
          <code class="rounded-lg bg-neutral-2 px-1.5 py-0.5">bg-{{ kebabCase(key) }}</code>
        </div>
        <div class="mt-2">
          CSS variable:
          <code class="rounded-lg bg-neutral-2 px-1 py-0.5">var(--{{ `${cssPrefix ? `${cssPrefix}-` : ''}${kebabCase(key)}` }})</code>
        </div>
      </div>
      <div class="flex-auto"></div>
      <div class="shrink-0">
        <div v-if="isColor(key)" class="flex items-center gap-2">
          <input v-model="json[key][scheme]" class="b-none bg-transparent text-right font-mono outline-none" />
          <Palette v-model="json[key][scheme]" />
        </div>
        <div v-if="isShape(key)">
          <input v-model="json[key]" class="b-none bg-transparent text-right font-mono outline-none" />
        </div>
      </div>
    </div>
  </div>
  <pre>
{{ json }}
  </pre>
</template>

<style scoped>
.palette-row {
  @apply font-mono flex items-center b-0 b-b-1 b-light b-solid px-2 py-1;
}
</style>
