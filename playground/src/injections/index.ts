import type { InjectionKey, Ref } from "vue";

export const showColorPickerKey: InjectionKey<Ref<boolean>> = Symbol("showColorPicker");
