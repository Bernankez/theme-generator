<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { scheme } from "@/shared/isDark";

function toggleScheme() {
  scheme.value = scheme.value === "dark" ? "light" : "dark";
}

const showMenu = ref(false);

const menuRef = ref<HTMLDivElement>();
const menuBtnRef = ref<HTMLDivElement>();
onClickOutside(menuRef, (e) => {
  if (menuBtnRef.value && !menuBtnRef.value.contains(e.target as Node)) {
    showMenu.value = false;
  }
});
</script>

<template>
  <div class="bg-background @container">
    <header class="sticky left-0 top-0 z-1 w-full flex items-center justify-between bg-background bg-opacity-70 p-3 backdrop-blur-8 backdrop-saturate-50">
      <div>
        <div class="i-lucide:dog text-10 text-primary"></div>
      </div>
      <div>
        <div class="relative">
          <div ref="menuBtnRef" class="cursor-pointer rounded-md p-2 text-foreground transition hover:bg-accent" @click="showMenu = !showMenu">
            <div v-if="!showMenu" class="i-lucide:menu"></div>
            <div v-else class="i-lucide:x"></div>
          </div>
          <Transition name="menu">
            <div v-show="showMenu" ref="menuRef" class="absolute right-0 top-[calc(100%_+_.25rem)] w-50 select-none b-1 b-border rounded-md b-solid bg-background text-foreground shadow">
              <div class="p-1">
                <div
                  class="cursor-default rounded-md px-2 py-1 transition hover:bg-muted" @click="() => {
                    toggleScheme();
                    showMenu = false;
                  }"
                >
                  Toggle Scheme
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </header>
    <div class="h-200 flex flex-col-reverse items-center justify-evenly gap-3 p-3 @lg:flex-row">
      <div class="flex flex-col gap-10">
        <div class="text-center text-5xl text-foreground font-bold font-italic @lg:text-start">
          Visualize Your Colors<br />
          On a
          <span class="text-primary">Real</span>
          Site
        </div>
        <div class="flex justify-center gap-3 @lg:justify-start">
          <button class="rounded-md bg-primary p-3 text-primary-foreground transition hover:bg-primary/90">
            Getting Started
          </button>
          <button class="rounded-md bg-secondary p-3 text-secondary-foreground transition hover:bg-secondary/90">
            Document
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 shrink-0 gap-10 text-8xl @lg:text-9xl">
        <div class="i-lucide:dog text-primary"></div>
        <div class="i-lucide:bird text-secondary"></div>
        <div class="i-lucide:carrot text-secondary"></div>
        <div class="i-lucide:cat text-primary"></div>
      </div>
    </div>
    <div class="flex flex-col gap-20 p-3">
      <div>
        <h2 class="my-3 text-center text-3xl text-foreground font-bold">
          Why <code>@bernankez/theme-generator</code>
        </h2>
        <div class="flex flex-col gap-3 @lg:flex-row">
          <div class="card">
            <div class="text-xl font-bold">
              One Click
            </div>
            Auto generate theme via a primary color
          </div>
          <div class="card">
            <div class="text-xl font-bold">
              UI Framework Presets
            </div>
            Adapt for multiple UI frameworks
          </div>
          <div class="card">
            <div class="text-xl font-bold">
              Fully Opensource
            </div>
            Visit on GitHub
          </div>
        </div>
      </div>
      <div class="mx-auto">
        <h2 class="my-3 text-center text-3xl text-foreground font-bold">
          Colors
        </h2>
        <div class="flex flex-wrap gap-3">
          <div class="color bg-background text-foreground">
            Base
          </div>
          <div class="color bg-primary text-primary-foreground">
            Primary
          </div>
          <div class="color bg-secondary text-secondary-foreground">
            Secondary
          </div>
          <div class="color bg-accent text-accent-foreground">
            Accent
          </div>
          <div class="color bg-background text-foreground b-0! hover:bg-accent hover:text-accent-foreground">
            Ghost
          </div>
          <div class="color select-none bg-muted text-muted-foreground cursor-not-allowed!">
            Muted
          </div>
          <div class="color bg-info text-info-foreground b-0!">
            Info
          </div>
          <div class="color bg-success text-success-foreground b-0!">
            Success
          </div>
          <div class="color bg-warning text-warning-foreground b-0!">
            Warning
          </div>
          <div class="color bg-error text-error-foreground b-0!">
            Error
          </div>
        </div>
      </div>
      <div class="mx-auto max-w-full w-200 rounded-md bg-accent p-3 text-foreground">
        <div class="flex items-center gap-3">
          <div class="i-lucide:dog text-10 text-primary"></div>
          <span class="font-bold">
            @bernankez/theme-generator
          </span>
        </div>
        <h3 class="my-3 text-center text-2xl text-foreground font-bold">
          About Colors
        </h3>
        <p>
          Mainly referenced <code><a href="https://ui.shadcn.com/" target="_blank">shadcn</a></code> and
          <code><a href="https://daisyui.com/" target="_blank">daisyUI</a></code>,
          but not entirely the same as them.
          Colors will be automatically inferred according to different presets.
        </p>
        <p>
          In addition, due to the different color styles of different UI libraries (for example, <code>daisyUI</code> tends to use accent color extensively while <code>shadcn</code> tends to use primary color more), the color usage style of this library is closer to shadcn.
        </p>
        <div class="mt-3 flex gap-3">
          <a href="https://github.com/Bernankez/theme-generator" target="_blank">
            GitHub
          </a>
          <a href="https://github.com/Bernankez/theme-generator?tab=readme-ov-file#-theme-generator" target="_blank">
            Document
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply hover:text-primary-foreground hover:bg-primary/90 transition b-1 b-dashed b-primary p-0.5 rounded-md;
}

.card {
  @apply flex flex-col justify-between flex-1 cursor-default b-1 b-border rounded-lg b-solid bg-background p-3 text-foreground transition hover:b-accent hover:bg-accent hover:text-accent-foreground min-h-35;
}

.color {
  @apply b-border b-1 b-solid rounded-lg p-3 cursor-default transition;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 150ms;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform-origin: top right;
  scale: 0.9;
}
</style>
