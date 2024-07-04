<script setup lang="ts">
</script>

<template>
  <div class="bg-background p-3 @container">
    <div class="h-200 flex flex-col-reverse items-center justify-evenly gap-3 @lg:flex-row">
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
          <button class="rounded-md bg-background p-3 text-foreground transition hover:bg-accent hover:text-accent-foreground">
            Document
          </button>
          <button class="b-1 b-border rounded-md b-solid bg-background p-3 text-foreground transition hover:bg-accent hover:text-accent-foreground">
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
    <div class="mt-3">
      <h2 class="my-3 text-center text-3xl text-foreground font-bold">
        Why <code>@bernankez/theme-generator</code>
      </h2>
      <div class="flex flex-col gap-3 @lg:flex-row">
        <div class="flex-1 rounded-lg bg-accent p-3 text-accent-foreground">
          <div class="text-xl font-bold">
            One Click
          </div>
          Auto infer theme from a primary color
        </div>
        <div class="flex-1 rounded-lg bg-accent p-3 text-accent-foreground">
          <div class="text-xl font-bold">
            UI Framework Presets
          </div>
          Adapt for multiple UI frameworks
        </div>
        <div class="flex-1 rounded-lg bg-accent p-3 text-accent-foreground">
          <div class="text-xl font-bold">
            Fully Opensource
          </div>
          Visit on GitHub
        </div>
      </div>
    </div>
  </div>
</template>
