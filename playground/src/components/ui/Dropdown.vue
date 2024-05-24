<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from "@headlessui/vue";
import Button from "./Button.vue";

defineProps<{
  icon?: string;
  label?: string;
  title?: string;
}>();
</script>

<template>
  <Menu v-slot="{ open }" as="div" class="relative inline-block">
    <MenuButton as="template">
      <slot name="trigger" :open>
        <Button :icon :active="open || undefined" :title="title">
          {{ label }}
          <div class="i-lucide:chevron-right transition" :class="[open ? 'rotate-90' : '']"></div>
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
        class="absolute right-0 z-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-none divide-y divide-muted"
      >
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
