import { Notification } from 'electron';

export default function sendNotification(title: string, body: string): void {
  if (process.platform === 'darwin') {
    console.info(
      '請手動檢查用戶是否處於活動狀態、屏幕是否被鎖定、或者是否啟用了“請勿打擾”'
    );
  }
  const notification = new Notification({
    title,
    body,
  });
  notification.show();
}
