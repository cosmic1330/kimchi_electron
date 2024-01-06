import QRCode from 'qrcode';
import { ChangeEvent, useEffect, useState } from 'react';

export default function useTopt() {
  const [secret, setSecret] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [customTopt, setCustomTopt] = useState<string>('');

  const generateSecret = async () => {
    try {
      const secretKey = await window.electron.topt.generateSecret();
      setSecret(secretKey);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const generateOtpauth = async () => {
    try {
      const text = await window.electron.topt.generateOtpauth([
        secret,
        'kim',
        'service',
      ]);
      const img = await QRCode.toDataURL(text);
      setQrCode(img);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const check = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value;
    try {
      const res = await window.electron.topt.check([secret, token]);
      setIsValidate(res);
    } catch (error) {
      setIsValidate(false);
    }
  };

  const refreshCustomTopt = async () => {
    try {
      const res = await window.electron.topt.custom(secret);
      setCustomTopt(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateSecret();
  }, []);

  return {
    qrCode,
    isValidate,
    customTopt,
    refreshCustomTopt,
    check,
    generateOtpauth,
  };
}
