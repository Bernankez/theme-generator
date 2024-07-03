<script setup lang="ts">
import { inject, ref } from "vue";
import Button from "../components/ui/Button.vue";
import Dropdown from "../components/ui/Dropdown.vue";
import MenuItem from "../components/ui/MenuItem.vue";
import MenuItemTitle from "../components/ui/MenuItemTitle.vue";
import ExportDialog from "../components/ExportDialog.vue";
import { useTemplate } from "@/composables/useTemplate";
import MenuItemTemplate from "@/components/MenuItemTemplate.vue";
import MenuItemTemplateProvider from "@/components/MenuItemTemplateProvider.vue";
import { showColorPickerKey } from "@/injections";
import { useViewTransition } from "@/composables/useViewTransition";

const { currentTemplate, tempTemplate, customTemplates, builtInTemplates, importTemplateFromJson, exportTemplateToJson, updateTemplate, addDefaultTemplate } = useTemplate();

const showExport = ref(false);

const { diffuse } = useViewTransition();
const showColorPicker = inject(showColorPickerKey, ref(false));
function generate(event: MouseEvent) {
  diffuse(event.clientX, event.clientY, (classList) => {
    classList.add("fullscreen-color-picker");
    showColorPicker.value = true;
  });
}
</script>

<template>
  <header class="flex items-center justify-between gap-3 bg-background px-2 py-3 font-mono shadow @container">
    <div class="flex items-center gap-1">
      <div class="i-fluent-emoji:rainbow shrink-0 text-3xl"></div>
      <div class="hidden text-2xl @md:block">
        theme-generator
        <sup class="text-sm">
          <i>Beta</i>
        </sup>
      </div>
    </div>
    <div class="flex select-none items-center gap-3">
      <Dropdown :label="currentTemplate.name" title="Themes" icon="i-lucide:palette">
        <div v-if="tempTemplate" class="p-1">
          <MenuItemTemplate :template="tempTemplate" @update:template="updateTemplate" />
        </div>
        <div class="p-1">
          <MenuItemTemplateProvider>
            <MenuItemTemplate v-for="template in customTemplates" :key="template._id" :template @update:template="updateTemplate" />
          </MenuItemTemplateProvider>
          <MenuItem :auto-collapse="false" icon="i-lucide:square-plus" @click="() => addDefaultTemplate()">
            New
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem :auto-collapse="false" icon="i-lucide:wand" @click="generate">
            Generate from a color
          </MenuItem>
        </div>
        <div v-if="builtInTemplates.length" class="p-1">
          <MenuItemTitle>
            Built-in
          </MenuItemTitle>
          <MenuItemTemplate v-for="template in builtInTemplates" :key="template._id" :template @update:template="updateTemplate" />
        </div>
        <div class="p-1">
          <MenuItem :auto-collapse="false" icon="i-lucide:import" @click="() => importTemplateFromJson()">
            Import
          </MenuItem>
          <MenuItem :auto-collapse="false" icon="i-lucide:upload" @click="() => exportTemplateToJson(currentTemplate)">
            Export
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
