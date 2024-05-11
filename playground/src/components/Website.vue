<script setup lang="ts">

</script>

<template>
  <div class="bg-background p-3">
    <div class="flex justify-evenly">
      <div class="flex flex-col gap-10">
        <div class="text-5xl text-foreground font-bold font-italic">
          Visualize Your Colors<br />
          On a
          <span class="text-primary">Real</span>
          Site
        </div>
        <div class="flex gap-3">
          <button class="rounded-md bg-primary p-3 text-primary-foreground hover:bg-primary/90">
            Getting Started
          </button>
          <button class="rounded-md bg-secondary p-3 text-secondary-foreground hover:bg-secondary/90">
            Document
          </button>
        </div>
      </div>
      <div class="grid grid-cols-2 shrink-0 text-8xl">
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
      <div class="flex gap-3">
        <div class="rounded-md bg-accent p-3 text-accent-foreground">
          <div class="text-xl font-bold">
            Fully Opensource
          </div>
          Push a few buttons, and there you have it! Your very own branding colors, ready to export.
        </div><div class="rounded-xl bg-accent p-3 text-accent-foreground">
          <div class="text-xl font-bold">
            Fully Opensource
          </div>
          Push a few buttons, and there you have it! Your very own branding colors, ready to export.
        </div><div class="rounded-md bg-accent p-3 text-accent-foreground">
          <div class="text-xl font-bold">
            Fully Opensource
          </div>
          Push a few buttons, and there you have it! Your very own branding colors, ready to export.
        </div>
      </div>
    </div>
  </div>
</template>
