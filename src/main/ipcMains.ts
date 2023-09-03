import { app, ipcMain } from 'electron';
import { Example } from './channels';

ipcMain.on(Example.IpcExample, async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply(Example.IpcExample, msgTemplate('pong'));
});

ipcMain.on(Example.AppVersion, (event) => {
  event.returnValue = app.getVersion();
});
