enum Example {
  IpcExample = 'ipc-example',
  AppVersion = 'app-version',
  SudoCommand = 'run-sudo-command',
  Topt = '2fa-topt',
  CustomTopt = 'custom-topt',
}
enum Updater {
  CheckingForUpdate = 'checking-for-update',
  AutoUpdaterCanUpdate = 'autoUpdater-canUpdate',
  AutoUpdaterError = 'autoUpdater-error',
  AutoUpdaterProgress = 'autoUpdater-progress',
  AutoUpdaterDownloaded = 'autoUpdater-downloaded',
  AutoUpdaterToDownload = 'autoUpdater-toDownload',
  ExitApp = 'exit-app',
  MonitorUpdateSystem = 'monitor-update-system',
  ConsoleLog = 'log',
}
enum Notification {
  SendNotification = 'send-notification',
}
enum TOPT {
  GenerateOtpauth = 'generate-otpauth',
  Check = 'check-token',
  Custom = 'custom-topt',
  GenerateSecret = 'generate-secret',
}

enum SystemInformation {
  GetUsbDevices = 'get-usb-devices',
}
export { Example, Notification, SystemInformation, TOPT, Updater };
