<script setup lang="ts">
import { ref, toValue } from "vue";
import { storeToRefs } from "pinia";
import { toColor } from "@bernankez/theme-generator";
import Button from "../components/ui/Button.vue";
import Dropdown from "../components/ui/Dropdown.vue";
import MenuItem from "../components/ui/MenuItem.vue";
import ExportDialog from "../components/ExportDialog.vue";
import type { MenuItemConfig } from "../store/theme";
import { useThemeStore } from "../store/theme";
import Palette from "../components/ui/Palette.vue";
import { useConfig } from "../composables/useConfig";

const { themeColor, selectedId, selected, menus, cssPrefix } = storeToRefs(useThemeStore());

const { importConfig, exportConfig, removeConfig } = useConfig();

const showExport = ref(false);

function onMenuChange(menu: MenuItemConfig) {
  selectedId.value = menu.id;
  if (menu.cssPrefix) {
    cssPrefix.value = menu.cssPrefix;
  }
}

function remove(menu: MenuItemConfig) {
  removeConfig(menu.id);
  if (selectedId.value === menu.id) {
    selectedId.value = "default";
  }
}
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
      <Palette v-if="selected.mode === 'infer'" v-model="themeColor" round />
      <Dropdown :label="toValue(selected.label)" title="Preset" icon="i-lucide:palette">
        <div class="p-1">
          <MenuItem v-for="menu in menus" :key="menu.id" :active="menu.id === selected.id || undefined" :title="menu.title" @click="onMenuChange(menu)">
            <div class="h-2 w-2 rounded-full" :style="{ backgroundColor: toColor(toValue(menu.theme)?.colors.primary || '').light }"></div>
            {{ toValue(menu.label) }}
            <div v-if="menu.deletable" class="i-lucide:trash-2 ml-auto" @click.stop="remove(menu)"></div>
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem :auto-collapse="false" icon="i-lucide:import" @click="() => importConfig((config) => selectedId = config._id)">
            Import
          </MenuItem>
          <MenuItem :auto-collapse="false" icon="i-lucide:share" @click="() => exportConfig()">
            Export
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem disabled class="cursor-default!">
            <span class="text-sm">
              Switching the preset will lose all your changes.
            </span>
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
