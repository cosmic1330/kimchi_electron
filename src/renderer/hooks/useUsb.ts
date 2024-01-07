import { useCallback, useEffect, useState } from 'react';

export default function useUsb() {
  const [usblist, setUsbList] = useState([]);
  const getUsbDevices = useCallback(async () => {
    try {
      const data = await window.electron.systeminformation.getUsbDevices();
      setUsbList(data);
      return 'success';
    } catch (error) {
      return 'error';
    }
  }, []);

  useEffect(() => {
    getUsbDevices();
  }, [getUsbDevices]);
  return { usblist };
}
