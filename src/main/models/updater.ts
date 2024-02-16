import { BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { Updater } from '../channels';
import { UpdaterProcessType } from '../types';

class AppUpdater {
  win: BrowserWindow;

  constructor(win: BrowserWindow) {
    this.win = win;
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.autoDownload = false; // 是否自动更新
    autoUpdater.autoInstallOnAppQuit = true; // APP退出的时候自动安装

    // 检测是否有更新
    setTimeout(() => {
      autoUpdater.checkForUpdates();
    }, 5000);

    autoUpdater.on('checking-for-update', () => {
      this.send(Updater.ConsoleLog, '檢查更新版本');
      this.send(Updater.CheckingForUpdate);
    });

    // 可以更新版本
    autoUpdater.on('update-available', (info: any) => {
      this.send(Updater.ConsoleLog, { title: '可以更新版本', info });
      this.send(Updater.AutoUpdaterCanUpdate, info);
    });
    // 发起更新程序
    ipcMain.on(Updater.AutoUpdaterToDownload, () => {
      this.send(Updater.ConsoleLog, '发起更新开始');
      autoUpdater
        .downloadUpdate()
        .then((r) =>
          this.send(Updater.ConsoleLog, { title: '发起更新成功', r }),
        )
        .catch((err) =>
          this.send(Updater.ConsoleLog, { title: '发起更新失败', err }),
        );
    });
    // 更新错误
    autoUpdater.on('error', (err: any) => {
      this.send(Updater.ConsoleLog, { title: '更新错误', err });
      this.send(Updater.AutoUpdaterError, err);
    });
    // 正在下载的下载进度
    autoUpdater.on('download-progress', (progressObj: UpdaterProcessType) => {
      this.send(Updater.ConsoleLog, {
        title: '正在下载的下载进度',
        progressObj,
      });
      this.send(Updater.AutoUpdaterProgress, progressObj);
    });
    // 下载完成
    autoUpdater.on('update-downloaded', (r) => {
      this.send(Updater.ConsoleLog, { title: '下载完成', r });
      this.send(Updater.AutoUpdaterDownloaded);
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

  send(status?: any, params?: any) {
    this.win.webContents.send(status, params);
  }
}

export default AppUpdater;
