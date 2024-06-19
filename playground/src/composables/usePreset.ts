import { type Preset, presetNone, presetShadcn } from "@bernankez/theme-generator";
import { type MaybeRefOrGetter, computed, toValue } from "vue";
import { useTemplate } from "./useTemplate";

const _presets = {
  none: presetNone,
  shadcn: presetShadcn,
};

export type PresetName = keyof typeof _presets;

export const presets = Object.keys(_presets) as PresetName[];

export function usePreset(preset: MaybeRefOrGetter<PresetName>) {
  const { currentTemplate } = useTemplate();

  const theme = computed(() => currentTemplate.value.theme);
  const cssPrefix = computed(() => currentTemplate.value.cssPrefix);

  const presetFn = computed(() => _presets[toValue(preset)]);
  const currentPreset = computed<Preset>(() => presetFn.value(theme.value, {
    cssPrefix: cssPrefix?.value,
  }));

  const json = computed(() => currentPreset.value.theme);
  const style = computed(() => currentPreset.value.style);
  const unocss = computed(() => currentPreset.value.unocss);
  const tailwind = computed(() => currentPreset.value.tailwind);
  const css = computed(() => {
    return `:root {
${Object.entries((style.value?.light || {})).map(([key, value]) => {
    return `  ${key}: ${value};`;
  }).join("\n")}
}

:root .dark {
${Object.entries((style.value?.dark || {})).map(([key, value]) => {
  return `  ${key}: ${value};`;
}).join("\n")}
}`;
  });

  return {
    preset: currentPreset,
    json,
    style,
    css,
    unocss,
    tailwind,
  };
}
