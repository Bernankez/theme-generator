import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useThemeStore } from "../store/theme";
import { type InternalThemeConfig, configVersion, useConfig } from "./useConfig";

export interface Menu extends InternalThemeConfig {

}

export function useMenu() {
  const { configs, builtInConfigs } = useConfig();
  const { theme } = storeToRefs(useThemeStore());

  const customMenu = computed<Menu>(() => ({
    version: configVersion,
    _id: "custom",
    name: "Custom",
    theme: theme.value,
    _removable: false,
  }));

  const _menus = computed<Menu[]>(() => [customMenu.value, ...builtInConfigs.value, ...configs.value]);
  const currentMenuId = ref<string>("custom");
  const currentMenu = computed(() => _menus.value.find(menu => menu._id === currentMenuId.value));
  const configMenus = computed(() => configs.value);
  const builtInConfigMenus = computed(() => builtInConfigs.value);

  return {
    _menus,
    currentMenu,
    currentMenuId,

    customMenu,
    configMenus,
    builtInConfigMenus,
  };
}
