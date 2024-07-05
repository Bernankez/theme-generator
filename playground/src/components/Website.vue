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
  </div>
</template>

<style scoped>
.card {
  @apply flex-1 cursor-default b-1 b-border rounded-lg b-solid bg-background p-3 text-foreground transition hover:b-accent hover:bg-accent hover:text-accent-foreground;
}

.color {
  @apply b-border b-1 b-solid rounded-lg p-3 cursor-default transition;
}
</style>
