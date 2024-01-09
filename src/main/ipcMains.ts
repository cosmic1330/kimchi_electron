import { BrowserWindow, app, ipcMain } from 'electron';
import path from 'path';
import si from 'systeminformation';
import { Example, SystemInformation, TOPT, Xfreerdp } from './channels';
import { executePlateformFunction, sudoCommand } from './utils';
import asyncSpawn from './utils/asyncSpawn';
import {
  check,
  generateOtpauth,
  generateSecret,
  generateTOTP,
} from './utils/topt';

export default class IpcMainBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildIpcMain() {
    /** **********
     *  EXAMPLE  *
     *********** */
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

    /** ********
     *   TOPT  *
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
    ipcMain.handle(TOPT.GenerateSecret, async () => {
      return generateSecret();
    });

    /** **********************
     *  System Information   *
     *********************** */
    ipcMain.handle(SystemInformation.GetUsbDevices, async () => {
      const data = await si.usb();
      return data;
    });

    /** ***********
     *  Xfreerdp  *
     ************ */
    ipcMain.handle(
      Xfreerdp.OpenXfreerdp,
      async (
        _,
        user: string,
        password: string,
        vm: string,
        props: string[],
      ) => {
        const config = ['-u', user, '-p', password, '-v', vm, ...props];
        const linuxPath = app.isPackaged
          ? path.join(
              process.resourcesPath,
              'assets/terminal/docker-freerdp.sh',
            )
          : path.join(__dirname, '../../assets/terminal/docker-freerdp.sh');

        const func = {
          linux: () => asyncSpawn(linuxPath, config),
          darwin: () => asyncSpawn(linuxPath, config),
        };
        const result = executePlateformFunction(func);
        return result;
      },
    );

    this.mainWindow.webContents.on('did-finish-load', () => {
      console.log('IpcMainBuilder load finished');
    });
  }
}
