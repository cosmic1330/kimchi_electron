import { Button } from '@mui/material';
import useUsb from 'renderer/hooks/useUsb';
import icon from '../../../../assets/icon.svg';
import useNotification from '../../hooks/useNotification';
import useTopt from '../../hooks/useTopt';
import useUpdater from '../../hooks/useUpdater';

export default function Hello() {
  useUpdater();
  const { showNotification } = useNotification();
  const {
    qrCode,
    isValidate,
    customTopt,
    check,
    refreshCustomTopt,
    generateOtpauth,
  } = useTopt();
  useUsb();

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>App Version</h1>
      <p>{window.electron.ipcRenderer.version()}</p>
      <div className="Hello">
        <Button
          onClick={() => {
            showNotification(
              'Hello World',
              'This is a notification',
              'electron',
            );
          }}
        >
          Open Notification
        </Button>
      </div>
      <div>
        <h2>2FA-TOPT驗證</h2>
        <p>1. 生成Qrcode</p>
        <button onClick={generateOtpauth}>生成</button>
        <img src={qrCode} alt="QR Code" />
        <p>2. 驗證結果:{`${isValidate}`}</p>
        <input type="text" onChange={check} />
        <p>3. 自定義的Topt</p>
        <p>
          TOPT碼：{customTopt}
          <button onClick={refreshCustomTopt}>刷新</button>
        </p>
      </div>
    </div>
  );
}
