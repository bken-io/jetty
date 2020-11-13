// Basic init
const url = require("url");
const path = require("path");
const axios = require("axios");
const fs = require("fs-extra");
const unzipper = require("unzipper");
const electron = require("electron");

const { autoUpdater } = require("electron-updater");
const { app, BrowserWindow, dialog, ipcMain } = electron;

// Let electron reloads by itself when webpack watches changes in ./app/
if (process.env.ELECTRON_START_URL) {
  require("electron-reload")(__dirname);
}

// To avoid being garbage collected
let mainWindow;

app.on("ready", () => {
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    webPreferences: { nodeIntegration: true },
    icon: path.join(__dirname, "./src/public/logo.png"),
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./build/index.html"),
      protocol: "file:",
      slashes: true,
    });

  mainWindow.loadURL(startUrl);

  ipcMain.on("titleBarAction", (event, arg) => {
    if (arg === "maximize") {
      if (mainWindow.isMaximized()) {
        mainWindow.restore();
      } else {
        mainWindow.maximize();
      }
    }

    if (arg === "minimize") mainWindow.minimize();
    if (arg === "close") app.quit();
  });

  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

autoUpdater.on("update-available", () => {
  console.log("app update availible");
});

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.on("app_version", (event) => {
  event.sender.send("app_version", { version: app.getVersion() });
});

const getCommunityPath = () => {
  const appPath = app.getAppPath();
  const data = fs.readJSONSync(`${appPath}/config.json`);
  return data.communityDirectory;
};

ipcMain.on("installMod", async (event, arg) => {
  const communityPath = getCommunityPath();
  const data = JSON.parse(arg);

  const zipStoragePath = `${communityPath}/${data.id}.zip`;
  const unzippedDirPath = `${communityPath}/${data.id}`;

  const writeStream = fs.createWriteStream(zipStoragePath);

  const response = await axios({
    method: "GET",
    responseType: "stream",
    url: data.versions[0].link,
  });

  event.reply(
    "installMod",
    JSON.stringify({ label: "downloading", value: 50 })
  );
  response.data.pipe(writeStream);

  writeStream.on("finish", function () {
    event.reply(
      "installMod",
      JSON.stringify({ label: "extracting", value: 75 })
    );
    fs.createReadStream(zipStoragePath)
      .pipe(unzipper.Extract({ path: unzippedDirPath }))
      .on("finish", function () {
        fs.removeSync(zipStoragePath);
        console.log("downloading done: finish");
        event.reply("installMod", JSON.stringify({ label: "", value: 0 }));
      });
  });

  writeStream.on("error", function (err) {
    console.log(err);
  });
});

ipcMain.on("loadFolder", (event, arg) => {
  const appPath = app.getAppPath();
  const data = fs.readJSONSync(`${appPath}/config.json`);
  event.reply("selectFolder", data.communityDirectory);
});

ipcMain.on("selectFolder", (event, arg) => {
  const appPath = app.getAppPath();
  console.log("appPath", appPath);

  dialog
    .showOpenDialog(mainWindow, {
      title: "Select MSFS2020 Community Folder",
      defaultPath: "C:\\",
      buttonLabel: "Select",
      properties: ["openDirectory"],
    })
    .then((result) => {
      console.log("result", result);
      if (!result.canceled) {
        fs.writeJSONSync(`${appPath}/config.json`, {
          communityDirectory: result.filePaths[0],
        });
        event.reply("selectFolder", result.filePaths[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
