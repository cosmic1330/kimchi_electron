enum Example {
  IpcExample = 'ipc-example',
  AppVersion = 'app-version',
  SudoCommand = 'run-sudo-command',
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
export { Example, Updater };
