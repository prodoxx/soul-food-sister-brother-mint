import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import mitt from "mitt";

const emitter = mitt();

loadFonts();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(vuetify).use(createPinia()).mount("#app");
