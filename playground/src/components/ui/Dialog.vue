<script setup lang="ts">
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import Button from "./Button.vue";

const show = defineModel<boolean>();
</script>

<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" class="relative z-10" @close="show = false">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="h-full min-h-full flex items-center justify-center text-center sm:h-unset sm:p-4"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="h-full w-full transform overflow-hidden bg-white p-4 text-left align-middle transition-all sm:h-unset sm:max-w-2xl sm:rounded-lg sm:shadow-sm"
            >
              <DialogTitle
                as="h3"
                class="flex cursor-default select-none items-center justify-between text-lg text-gray-900 font-medium leading-6"
              >
                <slot v-if="$slots.title" name="title"></slot>
                <slot name="close">
                  <Button icon="i-lucide:x" @click="show = false" />
                </slot>
              </DialogTitle>
              <DialogDescription v-if="$slots.description">
                <slot name="description"></slot>
              </DialogDescription>
              <div v-if="$slots.default" class="mt-4">
                <slot></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
