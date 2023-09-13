import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import useNotification from './hooks/useNotification';
import useUpdater from './hooks/useUpdater';

function Hello() {
  useUpdater();
  const { showNotification } = useNotification();

  return (
    <div>
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
              'electron'
            );
          }}
        >
          send notification
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
