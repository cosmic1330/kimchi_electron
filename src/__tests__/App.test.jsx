import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  const mockElectron = {
    ipcRenderer: {
      sendMessage: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
      removeEventListener: jest.fn(),
      version: jest.fn(),
    },
    updater: {
      log: jest.fn(),
      on: jest.fn(),
    },
  };

  beforeAll(() => {
    global.window.electron = mockElectron;
  });

  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
