import { storeToRefs } from "pinia";
import { useFileDialog } from "@vueuse/core";
import { nanoid } from "nanoid";
import { toValue } from "vue";
import { useThemeStore } from "../store/theme";
import type { Theme } from "../../../src";
import { download } from "../shared/utils";
import { useConfigStore } from "../store/config";

export interface ThemeConfig {
  _id: string;
  _version: number;
  name: string;
  cssPrefix?: string;
  theme: Theme;
}

export function useConfig() {
  const themeStore = useThemeStore();
  const { selected, writableTheme, cssPrefix } = storeToRefs(themeStore);
  const { configs } = storeToRefs(useConfigStore());

  let hook: ((config: ThemeConfig) => void) | undefined;

  const { open, onChange, reset } = useFileDialog({
    accept: "application/json",
  });

  function exportConfig() {
    const config: ThemeConfig = {
      _id: nanoid(),
      _version: 0,
      name: toValue(selected.value.label),
      cssPrefix: cssPrefix.value,
      theme: writableTheme.value,
    };
    const file = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const name = `${config.name}.json`;
    download(file, name);
  }

  function importConfig(fn?: (config: ThemeConfig) => void) {
    hook = fn;
    open();
  }

  function removeConfig(id: string) {
    const index = configs.value.findIndex(config => config._id === id);
    index > -1 && configs.value.splice(index, 1);
  }

  onChange((fileList) => {
    if (!fileList) {
      return;
    }
    if (fileList[0].type !== "application/json") {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string) as ThemeConfig;
        configs.value.push(config);
        hook?.(config);
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(fileList[0]);
    reset();
  });

  return {
    importConfig,
    exportConfig,
    removeConfig,
    configs,
  };
}
