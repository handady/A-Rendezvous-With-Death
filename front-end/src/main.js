import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//导入全局样式
import "./assets/css/common.css";
//导入下载的iconfont字体
import "./assets/iconfont/iconfont.js";
// 导入字体样式
import "./assets/font/font.css";
// 导入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 导入库
import draggable from "@/utils/draggable.ts";
import VueKonva from 'vue-konva';
import 'vditor/dist/index.css';

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(VueKonva)
  .directive("draggable", draggable)
  .mount("#app");
