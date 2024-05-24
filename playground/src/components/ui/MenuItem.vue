<script setup lang="ts">
import { MenuItem } from "@headlessui/vue";
import Button from "./Button.vue";
</script>

<template>
  <MenuItem v-slot="{ active }" @click.prevent>
    <Button v-bind="$attrs">
      <slot :active></slot>
    </Button>
  </MenuItem>
</template>
