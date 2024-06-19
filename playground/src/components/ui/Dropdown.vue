<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import { ref } from "vue";
import { useElementHover } from "@vueuse/core";
import Button from "./Button.vue";

const props = withDefaults(defineProps<{
  trigger?: "hover" | "click";
  icon?: string;
  label?: string;
  title?: string;
  showArrow?: boolean;
}>(), {
  trigger: "click",
  showArrow: true,
});

const buttonRef = ref<InstanceType<typeof Button>>();
const isHovered = useElementHover(() => buttonRef.value?.$el);

function triggerOpen(open: boolean) {
  if (props.trigger === "hover") {
    return isHovered.value;
  }
  return open;
}
</script>

<template>
  <Menu v-slot="{ open }" as="div" class="relative inline-block">
    <MenuButton as="template">
      <slot name="trigger" :open>
        <Button ref="buttonRef" :icon :active="triggerOpen(open) || undefined" :title="title">
          {{ label }}
          <div v-if="showArrow" class="i-lucide:chevron-right shrink-0 transition" :class="[triggerOpen(open) ? 'rotate-90' : '']"></div>
        </Button>
      </slot>
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        v-if="triggerOpen(open)"
        static
        class="absolute right-0 z-1 mt-2 w-66 origin-top-right rounded-md bg-white shadow-lg outline-none divide-y divide-muted"
      >
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
