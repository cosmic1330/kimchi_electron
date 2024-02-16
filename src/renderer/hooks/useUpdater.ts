import { Updater } from 'main/channels';
import { UpdaterProcessType } from 'main/types';
import { useEffect, useState } from 'react';

export default function useUpdater() {
  const [process, setProcess] = useState(0);

  useEffect(() => {
    window.electron.updater.log();
    window.electron.updater.on(Updater.AutoUpdaterCanUpdate, (info: any) => {
      const choice = window.confirm(`发现新版本 v${info.version}`);
      if (choice) {
        window.electron.updater.saveUpdate();
      }
    });
    window.electron.updater.on(Updater.AutoUpdaterProgress, (processObj) => {
      // 進度條進度
      console.log(
        'window.electron.updater.Updater.AutoUpdaterProgress',
        processObj,
      );
      const { percent } = processObj as UpdaterProcessType;
      setProcess(percent);
    });
    window.electron.updater.on(Updater.AutoUpdaterError, (err) => {
      alert('更新失敗');
      console.log('window.electron.updater.Updater.AutoUpdaterError', err);
    });
    window.electron.updater.on(Updater.AutoUpdaterDownloaded, (err) => {
      console.log('window.electron.updater.Updater.AutoUpdaterError', err);
      const choice = window.confirm('更新完成，是否关闭应用程序安装新版本?');
      if (choice) {
        window.electron.updater.exitApp();
      }
    });
  }, []);
  return { process };
}
