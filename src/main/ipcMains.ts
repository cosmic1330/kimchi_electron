import { app, ipcMain } from 'electron';
import { Example, Notification, SmartCard, TOPT } from './channels';
import { sudoCommand } from './utils';
import sendNotification from './utils/sendNotification';
import {
  check,
  generateOtpauth,
  generateSecret,
  generateTOTP,
} from './utils/topt';
import getSmartCardInfo from './utils/getSmartCardInfo';

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

/******************
 *  Notification  *
 ******************/
ipcMain.on(Notification.SendNotification, (event, title, body) => {
  sendNotification(title, body);
});

/**********
 *  TOPT  *
 **********/
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

ipcMain.handle(TOPT.generateSecret, async (event) => {
  return generateSecret();
});

/****************
 *  Smart Card  *
 ****************/

ipcMain.handle(SmartCard.Run, async (event) => {
  return getSmartCardInfo(event.sender);
});

