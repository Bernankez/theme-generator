import { createApp } from "vue";
import { createPinia } from "pinia";
import { createNotivue } from "notivue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import "./styles/global.css";
import "notivue/notification.css";
import "notivue/animations.css";

createApp(App).use(createPinia().use(piniaPluginPersistedstate)).use(createNotivue({
  pauseOnHover: true,
})).mount("#app");
