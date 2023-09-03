import { app, ipcMain } from 'electron';
import { Example } from './channels';
import { sudoCommand } from './utils';

ipcMain.on(Example.IpcExample, async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply(Example.IpcExample, msgTemplate('pong'));
});

ipcMain.on(Example.AppVersion, (event) => {
  event.returnValue = app.getVersion();
});

ipcMain.handle(Example.SudoCommand, async (event, command) => {
  return sudoCommand(command);
});
