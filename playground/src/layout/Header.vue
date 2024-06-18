<script setup lang="ts">
import { ref } from "vue";
import { toColor } from "@bernankez/theme-generator";
import Button from "../components/ui/Button.vue";
import Dropdown from "../components/ui/Dropdown.vue";
import MenuItem from "../components/ui/MenuItem.vue";
import ExportDialog from "../components/ExportDialog.vue";
import { useMenu } from "../composables/useMenu";
import { scheme } from "../shared/isDark";

const { currentMenuId, customMenu, configMenus, builtInConfigMenus } = useMenu();

const showExport = ref(false);
</script>

<template>
  <header class="flex items-center justify-between gap-3 bg-background px-2 py-3 font-mono shadow @container">
    <div class="flex items-center gap-1">
      <div class="i-fluent-emoji:rainbow shrink-0 text-3xl"></div>
      <div class="hidden text-2xl @md:block">
        theme-generator
      </div>
    </div>
    <div class="flex select-none items-center gap-3">
      <Dropdown label="Presets" title="Presets" icon="i-lucide:palette">
        <div class="p-1">
          <MenuItem :auto-collapse="false" :active="currentMenuId === customMenu._id || undefined" :title="customMenu.name">
            <div class="h-2 w-2 rounded-full" :style="{ backgroundColor: toColor((customMenu.theme)?.colors.primary)?.[scheme] }"></div>
            {{ customMenu.name }}
          </MenuItem>
        </div>
        <div v-if="builtInConfigMenus.length" class="p-1">
          <MenuItem disabled class="cursor-default!">
            <span class="text-sm">Built-in themes</span>
          </MenuItem>
          <MenuItem v-for="menu in builtInConfigMenus" :key="menu._id" :active="currentMenuId === menu._id || undefined" :title="menu.name" :auto-collapse="false" icon="i-lucide:share-2">
            <div class="h-2 w-2 rounded-full" :style="{ backgroundColor: toColor((menu.theme)?.colors.primary)?.[scheme] }"></div>
            {{ menu.name }}
          </MenuItem>
        </div>
        <div v-if="configMenus.length" class="p-1">
          <MenuItem disabled class="cursor-default!">
            <span class="text-sm">Imported themes</span>
          </MenuItem>
          <MenuItem v-for="menu in configMenus" :key="menu._id" :active="currentMenuId === menu._id || undefined" :title="menu.name" :auto-collapse="false">
            <div class="h-2 w-2 rounded-full" :style="{ backgroundColor: toColor((menu.theme)?.colors.primary)?.[scheme] }"></div>
            {{ menu.name }}
            <div v-if="menu._removable" class="i-lucide:trash-2 ml-auto" @click.stop></div>
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem :auto-collapse="false" icon="i-lucide:import">
            Import
          </MenuItem>
          <MenuItem :auto-collapse="false" icon="i-lucide:share">
            Export
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem :auto-collapse="false" icon="i-lucide:share-2">
            Share
          </MenuItem>
        </div>
      </Dropdown>
      <Button icon="i-lucide:zap" title="Generate" @click="showExport = true">
        Generate
      </Button>
      <ExportDialog v-model="showExport" />
      <a href="https://github.com/Bernankez/theme-generator" class="cursor-default" title="GitHub" target="_blank">
        <div class="i-fa6-brands:github text-2xl"></div>
      </a>
    </div>
  </header>
</template>
