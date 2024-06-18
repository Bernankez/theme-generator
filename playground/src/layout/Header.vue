<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { push } from "notivue";
import Button from "../components/ui/Button.vue";
import Dropdown from "../components/ui/Dropdown.vue";
import MenuItem from "../components/ui/MenuItem.vue";
import ExportDialog from "../components/ExportDialog.vue";
import { useThemeStore } from "../store/theme";
import { useShare } from "../composables/useShare";
import { useConfig } from "../composables/useConfig";

const { writableTheme } = storeToRefs(useThemeStore());
const { importConfig, exportConfig } = useConfig();

const { share } = useShare();

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
      <Dropdown :label="writableTheme.colors.primary.light" title="Preset" icon="i-lucide:palette">
        <div class="p-1">
          <MenuItem
            :auto-collapse="false" icon="i-lucide:import" @click="importConfig((config) => {
              writableTheme = config.theme
              push.success('Theme imported from config')
            })"
          >
            Import
          </MenuItem>
          <MenuItem :auto-collapse="false" icon="i-lucide:share" @click="exportConfig">
            Export
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem :auto-collapse="false" icon="i-lucide:share-2" @click="() => share(writableTheme)">
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
