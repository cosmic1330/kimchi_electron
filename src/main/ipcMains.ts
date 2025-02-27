import { app, BrowserWindow, ipcMain } from 'electron';
import { Example, TOPT } from './channels';
import {
  creatTransparentChilds,
  transparentWindow,
} from './transparent_window/childs';
import { sudoCommand } from './utils';
import {
  check,
  generateOtpauth,
  generateSecret,
  generateTOTP,
} from './utils/topt';

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

/* *********
 *  TOPT  *
 ********* */
ipcMain.handle(TOPT.GenerateOtpauth, async (event, args) => {
  const [secret, user, service] = args;
  return generateOtpauth(secret, user, service);
});

ipcMain.handle(TOPT.Check, async (event, args) => {
  const [secret, token] = args;
  return check(secret, token);
});

ipcMain.handle(TOPT.Custom, async (event, secret) => {
  return generateTOTP(secret);
});

ipcMain.handle(TOPT.generateSecret, async () => {
  return generateSecret();
});

/* **********************
 *  Transparent Window  *
 ********************** */
ipcMain.on('open-transparent-window', async () => {
  if (transparentWindow.size === 0) creatTransparentChilds();
});
ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.setIgnoreMouseEvents(ignore, options);
});
