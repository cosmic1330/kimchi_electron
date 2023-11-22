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
  generateSecret = 'generate-secret',
}
enum SmartCard {
  Run = 'run-smart-card',
  Listen = 'listen-smart-card',
}
export { Example, Updater, Notification, TOPT, SmartCard };
