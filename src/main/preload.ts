// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Example, Updater } from './channels';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Example.IpcExample, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Example.IpcExample, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Example.IpcExample, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    version() {
      return ipcRenderer.sendSync(Example.AppVersion);
    },
  },
  updater: {
    saveUpdate() {
      ipcRenderer.send(Updater.AutoUpdaterToDownload);
    },
    exitApp() {
      ipcRenderer.send(Updater.ExitApp);
    },
    log() {
      const show = (_event: IpcRendererEvent, info: unknown) =>
        console.log(info);
      ipcRenderer.on(Updater.ConsoleLog, show);
      return () => {
        ipcRenderer.removeListener(Updater.ConsoleLog, show);
      };
    },
    on(channel: Updater, callback: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        callback(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
