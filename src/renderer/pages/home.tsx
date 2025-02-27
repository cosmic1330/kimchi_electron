import icon from '../../../assets/icon.svg';
import '../App.css';
import useNotification from '../hooks/useNotification';
import useTopt from '../hooks/useTopt';
import useUpdater from '../hooks/useUpdater';

export default function Home() {
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

  return (
    <div id="app">
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate{window.electron.ipcRenderer.version()}</h1>
      <div className="Hello">
        <button
          type="button"
          onClick={() => {
            showNotification(
              'Hello World',
              'This is a notification',
              'electron',
            );
          }}
        >
          send notification
        </button>
      </div>
      <div>
        <h2>2FA-TOPT驗證</h2>
        <p>1. 生成Qrcode</p>
        <button type="button" onClick={generateOtpauth}>
          生成
        </button>
        <img src={qrCode} alt="QR Code" />
        <p>2. 驗證結果:{`${isValidate}`}</p>
        <input type="text" onChange={check} />
        <p>3. 自定義的Topt</p>
        <p>
          TOPT碼：{customTopt}
          <button type="button" onClick={refreshCustomTopt}>
            刷新
          </button>
        </p>
      </div>
      <div>
        <h2>透明視窗</h2>
        <p>
          <button
            type="button"
            onClick={() => {
              window.electron.transparentWindow.open();
            }}
          >
            開啟透明視窗
          </button>
        </p>
      </div>
    </div>
  );
}
