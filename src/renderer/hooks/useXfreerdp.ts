import { useCallback, useMemo, useState } from 'react';

export default function useXfreerdp() {
  const [fullScreen, setFullScreen] = useState(false);
  const [usb, setUsb] = useState<string | null>(null);
  const [mount, setMount] = useState<string | null>(null);
  const [clipboard, setClipboard] = useState(true);
  const [sound, setSound] = useState(true);
  const [microphone, setMicrophone] = useState(true);
  const props = useMemo(() => {
    const res: string[] = [];
    if (fullScreen) res.push('/f');
    if (sound) res.push('/sound');
    if (microphone) res.push('/microphone');
    if (mount === null) res.push('/drive:hotplug,*');
    else res.push(`/drive:hotplug,*,${mount}`);
    if (usb !== null) {
      res.push('/rfx');
      res.push(`/usb:id:${usb}`);
    }
    if (!clipboard) res.push('-clipboard');
    return res;
  }, [clipboard, fullScreen, microphone, mount, sound, usb]);

  const openXfreerdp = useCallback(
    async (user: string, password: string, vm: string) => {
      try {
        const data = await window.electron.xfreerdp.open(
          user,
          password,
          vm,
          props,
        );
        console.log(data);
        return 'success';
      } catch (error) {
        return 'error';
      }
    },
    [props],
  );

  return { openXfreerdp };
}
