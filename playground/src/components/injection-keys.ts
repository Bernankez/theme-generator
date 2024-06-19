import type { InjectionKey, Ref } from "vue";

export const editIdKey: InjectionKey<Ref<string | undefined>> = Symbol("editIdKey");
