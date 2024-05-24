import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import "./styles/global.css";

createApp(App).use(createPinia().use(piniaPluginPersistedstate)).mount("#app");
