import { BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';

class AppUpdater {
  win: BrowserWindow;

  constructor(win: BrowserWindow) {
    this.win = win;
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdates();

    // 取消自动安装
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on('checking-for-update', () => {
      this.sendStatusToWindow('Checking for update...');
    });

    // 可以更新版本
    autoUpdater.on('update-available', (info: any) => {
      this.sendStatusToWindow('log', { title: '可以更新版本', info });
      this.sendStatusToWindow('autoUpdater-canUpdate', info);
    });

    // 更新错误
    autoUpdater.on('error', (err: any) => {
      this.sendStatusToWindow('log', { title: '更新错误', err });
      this.sendStatusToWindow('autoUpdater-error', err);
    });

    // 正在下载的下载进度
    autoUpdater.on('download-progress', (progressObj: any) => {
      this.sendStatusToWindow('log', {
        title: '正在下载的下载进度',
        progressObj,
      });
      this.sendStatusToWindow('autoUpdater-progress', progressObj);
    });

    // 下载完成
    autoUpdater.on('update-downloaded', (r) => {
      this.sendStatusToWindow('log', { title: '下载完成', r });
      this.sendStatusToWindow('autoUpdater-downloaded');
    });
  }

  sendStatusToWindow(status?: any, params?: any) {
    this.win.webContents.send(status, params);
  }
}

// 退出程序并安装
ipcMain.on('exit-app', () => {
  autoUpdater.quitAndInstall();
});

// 重新检查是否有新版本更新
ipcMain.on('monitor-update-system', () => {
  autoUpdater.checkForUpdates();
});

// 发起更新程序
ipcMain.on('autoUpdater-toDownload', () => {
  autoUpdater
    .downloadUpdate()
    .then((r) => log.info('更新程序发起更新成功', r))
    .catch((err) => log.info('更新程序发起更新失败', err));
});

export default AppUpdater;
