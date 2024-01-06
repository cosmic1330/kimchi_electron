import { useCallback, useEffect } from 'react';

export default function useUsb() {
  const getUsbDevices = useCallback(async () => {
    try {
      const data = await window.electron.systeminformation.getUsbDevices();
      console.log(data);
      return 'success';
    } catch (error) {
      return 'error';
    }
  }, []);

  useEffect(() => {
    getUsbDevices();
  }, [getUsbDevices]);
  return undefined;
}
