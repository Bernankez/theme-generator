<script setup lang="ts">
import { ref } from "vue";
import Dialog from "../components/Dialog.vue";

const openCSS = ref(false);
</script>

<template>
  <header class="flex items-center justify-between px-2 py-3 font-mono">
    <div class="text-2xl">
      theme-generator
    </div>
    <div class="flex items-center gap-3">
      <div class="cursor-default">
        JSON
      </div>
      <div class="cursor-default" @click="openCSS = true">
        CSS
      </div>
      <Dialog v-model="openCSS">
        <template #title>
          CSS
        </template>
        <div>
          <div class="relative rounded-lg bg-neutral-50 p-2">
            <div class="absolute right-2 top-2 flex cursor-default rounded-md p-2 transition active:bg-neutral-200 hover:bg-neutral-100">
              <div class="flex items-center gap-2">
                <div class="i-lucide:copy text-xl"></div>
                <span class="font-mono">Copy</span>
              </div>
            </div>
            code
          </div>
        </div>
      </Dialog>
      <a href="https://github.com/Bernankez/theme-generator" class="cursor-default" title="GitHub" target="_blank">
        <div class="i-fa6-brands:github text-2xl"></div>
      </a>
    </div>
  </header>
</template>
