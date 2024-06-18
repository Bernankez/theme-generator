import type { Theme } from "@bernankez/theme-generator";
import { storeToRefs } from "pinia";
import { useFileDialog } from "@vueuse/core";
import { nanoid } from "nanoid";
import packageJson from "../../package.json";
import { useConfigStore } from "../store/config";
import { download } from "../shared/utils";

export interface ThemeConfig {
  version: number;
  name: string;
  cssPrefix?: string;
  theme: Theme;
}

export interface InternalThemeConfig extends ThemeConfig {
  _id: string;
  _removable?: boolean;
}

export const configVersion = packageJson["@bernankez/theme-generator"].configVersion;

export function useConfig() {
  const configStore = useConfigStore();
  const { configs, builtInConfigs } = storeToRefs(configStore);

  let hook: ((config: InternalThemeConfig) => void) | undefined;

  const { open, onChange, reset } = useFileDialog({
    accept: "application/json",
  });

  function importConfig(fn?: (config: ThemeConfig) => void) {
    hook = fn;
    open();
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
        const _id = nanoid();
        const internalConfig = {
          ...config,
          _id,
          _removable: true,
        };
        hook?.(internalConfig);
        configs.value.push(internalConfig);
      } catch (error) {
        console.error(error);
      }
    };
    reader.readAsText(fileList[0]);
    reset();
  });

  function exportConfig(_id: string) {
    const internalConfig = configs.value.find(config => config._id === _id);
    if (!internalConfig) {
      return;
    }
    const { _id: _, _removable, ...config } = internalConfig;
    _exportConfig(config);
  }

  function removeConfig(_id: string) {
    const index = configs.value.findIndex(config => config._id === _id);
    index > -1 && configs.value.splice(index, 1);
  }

  function _exportConfig(config: ThemeConfig) {
    const file = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const name = `${config.name}.json`;
    download(file, name);
  }

  function exportThemeAsConfig(options: Omit<ThemeConfig, "version">) {
    const config: ThemeConfig = {
      version: configVersion,
      ...options,
    };
    _exportConfig(config);
  }

  function exportThemeAsUrl(theme: Theme) {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", JSON.stringify(theme));
    return url;
  }

  function importThemeFromUrl(url: string) {
    const resolvedUrl = new URL(url);
    const theme = resolvedUrl.searchParams.get("theme");
    if (!theme) {
      return;
    }
    try {
      const _theme = JSON.parse(theme) as Theme;
      return _theme;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    builtInConfigs,
    configs,
    importConfig,
    exportConfig,
    removeConfig,

    importThemeFromUrl,
    exportThemeAsUrl,
    exportThemeAsConfig,
  };
}
