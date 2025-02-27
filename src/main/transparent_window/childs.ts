import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import { resolveHtmlPath } from '../utils';
/*
 **************************
 *** Transparent Window ***
 **************************
 */

export const transparentWindow = new Set();

export function creatTransparentChilds() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;
  const transparent = new BrowserWindow({
    title: 'transparent',
    // width,
    // height,
    resizable: false,
    autoHideMenuBar: true,
    show: false,
    transparent: true,
    frame: false,
    center: true,
    skipTaskbar: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // ipcMain
  ipcMain.on('close-transparent-window', async () => {
    if (transparentWindow.size > 0) {
      const values = transparentWindow.values();
      (values.next().value as any).close();
    }
  });
  ipcMain.on('disable-ignore-mouse-events', () => {
    if (transparentWindow.size > 0) {
      const values = transparentWindow.values();
      (values.next().value as any).setIgnoreMouseEvents(false);
    }
  });

  ipcMain.on('enable-ignore-mouse-events', () => {
    if (transparentWindow.size > 0) {
      const values = transparentWindow.values();
      (values.next().value as any).setIgnoreMouseEvents(true, {
        forward: true,
      });
    }
  });

  transparent.loadURL(`${resolveHtmlPath('index.html')}#/transparent`);
  transparent.setAlwaysOnTop(true, 'pop-up-menu');
  transparent.setIgnoreMouseEvents(true, { forward: true });

  transparent.on('ready-to-show', () => {
    if (!transparent) {
      throw new Error('"transparent" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      transparent.minimize();
    } else {
      transparent.show();
      transparent.webContents.closeDevTools();
    }
  });

  transparent.on('closed', () => {
    transparentWindow.delete(transparent);
  });

  transparentWindow.add(transparent);
}
