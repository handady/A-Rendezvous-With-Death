// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => {
    // 白名单通道
    let validChannels = ["loadData"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["loadDataResponse"];
    if (validChannels.includes(channel)) {
      // 从主进程接收
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
