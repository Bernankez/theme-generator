<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import type { PresetName } from "../composables/usePreset";
import { presets, usePreset } from "../composables/usePreset";
import Dialog from "./ui/Dialog.vue";
import FloatingIndicator from "./ui/FloatingIndicator.vue";
import Select from "./ui/Select.vue";
import CodeBlock from "./CodeBlock.vue";

const show = defineModel({
  default: false,
});

const titles = [
  {
    label: "NODE",
    key: "node",
  },
  {
    label: "JSON",
    key: "json",
  },
  {
    label: "CSS",
    key: "css",
  },
  {
    label: "UnoCSS",
    key: "unocss",
  },
  {
    label: "Tailwind",
    key: "tailwind",
  },
];

const preset = ref<PresetName>("default");
const active = ref("node");

const currentPreset = usePreset(preset);
const filteredTitles = computed(() => titles.filter((title) => {
  return (title.key in currentPreset && currentPreset[title.key as keyof typeof currentPreset].value) || title.key === "node";
}));

watchEffect(() => {
  active.value = filteredTitles.value[0]?.key || "node";
});

const options = ref(presets.map(key => ({
  label: key,
  value: key,
})));

const presetKeyMap: Record<PresetName, string> = {
  default: "defaultPreset",
  shadcn: "shadcnPreset",
};
const index = computed(() => `import { defineTheme, inferThemeFromColor, ${presetKeyMap[preset.value]} } from "@bernankez/theme-generator";

// Use your favorite color
const inferredTheme = inferThemeFromColor("${currentPreset.preset.value.theme.colors.primary.light}");

const defaultTheme = defineTheme({
  defaults: inferredTheme,
});

const { ${Object.keys(currentPreset.preset.value).join(", ")} } = ${presetKeyMap[preset.value]}(defaultTheme);
`);
</script>

<template>
  <Dialog v-model="show">
    <template #title>
      <div class="flex items-center gap-2">
        UI Framework:
        <Select v-model="preset" :options="options" />
      </div>
    </template>
    <FloatingIndicator v-model="active" :data="filteredTitles" class="font-mono" />
    <div class="mt-3">
      <div v-if="active === 'node'" class="flex flex-col gap-3">
        <CodeBlock code="npm install @bernankez/theme-generator" lang="sh" />
        <CodeBlock :code="index" lang="ts" />
      </div>
      <div v-else-if="active === 'json'">
        <CodeBlock :code="JSON.stringify(currentPreset.json.value, null, 2)" lang="json" />
      </div>
      <div v-else-if="active === 'css'">
        <CodeBlock :code="currentPreset.css.value" lang="css" />
      </div>
      <div v-else-if="active === 'unocss'">
        <CodeBlock :code="JSON.stringify(currentPreset.unocss.value, null, 2)" lang="json" />
      </div>
      <div v-else-if="active === 'tailwind'">
        <CodeBlock :code="JSON.stringify(currentPreset.tailwind.value, null, 2)" lang="json" />
      </div>
    </div>
  </Dialog>
</template>
