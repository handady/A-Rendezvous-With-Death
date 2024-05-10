const { ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

function setupIpcHandlers(app) {
  // 读取文件
  ipcMain.on("loadData", (event) => {
    const filePath = path.join(__dirname, "..", "data", "2024", "2024.json");

    console.log(filePath);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        event.reply("loadDataResponse", { error: err.message });
        return;
      }
      event.reply("loadDataResponse", JSON.parse(data));
    });
  });
}

module.exports = { setupIpcHandlers };
