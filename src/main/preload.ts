// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Example, Notification, TOPT, Updater } from './channels';

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
      ipcRenderer.once(channel, (_event: any, ...args: any) => func(...args));
    },
    version() {
      return ipcRenderer.sendSync(Example.AppVersion);
    },
    sudo(command: string) {
      return ipcRenderer.invoke(Example.SudoCommand, command);
    },
  },
  topt:{
    check(args: [secret: string, token: string]) {
      return ipcRenderer.invoke(TOPT.Check, args);
    },
    generateOtpauth(args: [secret: string, user: string, service: string]) {
      return ipcRenderer.invoke(TOPT.GenerateOtpauth, args);
    },
    custom(secret:string) {
      return ipcRenderer.invoke(TOPT.Custom, secret);
    },
    generateSecret() {
      return ipcRenderer.invoke(TOPT.generateSecret);
    }
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
  notification: {
    send(title: string, body: string) {
      ipcRenderer.send(Notification.SendNotification, title, body);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
