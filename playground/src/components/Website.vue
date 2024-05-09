<script setup lang="ts">

</script>

<template>
  <div class="bg-background p-3">
    <div class="flex items-center justify-center gap-3">
      <div class="text-5xl text-foreground font-bold font-italic">
        Visualize Your Colors<br />
        On a
        <span class="text-primary">Real</span>
        Site
      </div>
      <div class="grid grid-cols-2 shrink-0 text-8xl">
        <div class="i-lucide:dog text-primary"></div>
        <div class="i-lucide:bird text-secondary"></div>
        <div class="i-lucide:carrot text-accent"></div>
        <div class="i-lucide:cat text-primary"></div>
      </div>
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
</template>
