/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { BrowserWindow, app, ipcMain, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { Notification, Updater } from './channels';
import IpcMainBuilder from './ipcMains';
import MenuBuilder from './menu';
import { getAssetPath, resolveHtmlPath, sendNotification } from './utils';

let mainWindow: BrowserWindow | null = null;

// updater
const sendStatusToWindow = (status?: any, params?: any) => {
  mainWindow?.webContents.send(status, params);
};

class AppUpdater {
  constructor(send: (status?: any, params?: any) => void) {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.autoDownload = false; // 是否自动更新
    autoUpdater.autoInstallOnAppQuit = true; // APP退出的时候自动安装

    // 检测是否有更新
    setTimeout(() => {
      autoUpdater.checkForUpdates();
    }, 5000);

    autoUpdater.on('checking-for-update', () => {
      send(Updater.CheckingForUpdate);
    });

    // 可以更新版本
    autoUpdater.on('update-available', (info: any) => {
      send(Updater.ConsoleLog, { title: '可以更新版本', info });
      send(Updater.AutoUpdaterCanUpdate, info);
    });
    // 发起更新程序
    ipcMain.on(Updater.AutoUpdaterToDownload, () => {
      send(Updater.ConsoleLog, '发起更新开始');
      autoUpdater
        .downloadUpdate()
        .then((r) => send(Updater.ConsoleLog, { title: '发起更新成功', r }))
        .catch((err) =>
          send(Updater.ConsoleLog, { title: '发起更新失败', err }),
        );
    });
    // 更新错误
    autoUpdater.on('error', (err: any) => {
      send(Updater.ConsoleLog, { title: '更新错误', err });
      send(Updater.AutoUpdaterError, err);
    });
    // 正在下载的下载进度
    autoUpdater.on('download-progress', (progressObj: any) => {
      send(Updater.ConsoleLog, { title: '正在下载的下载进度', progressObj });
      send(Updater.AutoUpdaterProgress, progressObj);
    });
    // 下载完成
    autoUpdater.on('update-downloaded', (r) => {
      send(Updater.ConsoleLog, { title: '下载完成', r });
      send(Updater.AutoUpdaterDownloaded);
    });
    // 退出程序并安装
    ipcMain.on(Updater.ExitApp, () => {
      autoUpdater.quitAndInstall();
    });
    // 重新检查是否有新版本更新
    ipcMain.on(Updater.MonitorUpdateSystem, () => {
      autoUpdater.checkForUpdates();
    });
  }
}

// debug
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

// notification
ipcMain.on(Notification.SendNotification, (event, title, body) => {
  sendNotification(title, body);
});

// mainWindow
const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const ipcMainBuilder = new IpcMainBuilder(mainWindow);
  ipcMainBuilder.buildIpcMain();
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater(sendStatusToWindow);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
