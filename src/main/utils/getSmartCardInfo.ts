import { SmartCard } from '../channels';

const pcsclite = require('@pokusew/pcsclite');

export default function getSmartCardInfo(webContents: Electron.WebContents) {
  console.log('執行 getSmartCardInfo中');
  webContents.send(SmartCard.Listen, 'info', `執行`);
  const pcsc = pcsclite();

  pcsc.on('reader', (reader: any) => {
    console.log('New reader detected', reader.name);
    webContents.send(SmartCard.Listen, 'info', `${reader.name} 已被偵測到`);

    reader.on('error', (err: any) => {
      console.log('Error(', reader.name, '):', err.message);
      webContents.send(SmartCard.Listen, 'error', err.message);
    });

    reader.on('status', (status: any) => {
      console.log('Status(', reader.name, '):', status);
      webContents.send(SmartCard.Listen, 'info', status);

      // check what has changed
      const changes = reader.state ^ status.state;

      if (!changes) {
        return;
      }

      if (
        changes & reader.SCARD_STATE_EMPTY &&
        status.state & reader.SCARD_STATE_EMPTY
      ) {
        console.log('card removed');

        reader.disconnect(reader.SCARD_LEAVE_CARD, (err: any) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log('Disconnected');
        });
      } else if (
        changes & reader.SCARD_STATE_PRESENT &&
        status.state & reader.SCARD_STATE_PRESENT
      ) {
        console.log('card inserted');

        reader.connect(
          { share_mode: reader.SCARD_SHARE_SHARED },
          (err: any, protocol: any) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log('Protocol(', reader.name, '):', protocol);
            webContents.send(SmartCard.Listen, 'info', protocol);

            reader.transmit(
              Buffer.from([0x00, 0xb0, 0x00, 0x00, 0x20]),
              40,
              protocol,
              (err: any, data: any) => {
                if (err) {
                  console.log(err);
                  return;
                }

                console.log('Data received', data);
                webContents.send(SmartCard.Listen, 'info', data);
                reader.close();
                pcsc.close();
              }
            );
          }
        );
      }
    });

    reader.on('end', () => {
      console.log('Reader', reader.name, 'removed');
      webContents.send(SmartCard.Listen, 'end', `${reader.name} 已被移除`);
    });
  });

  pcsc.on('error', (err: any) => {
    console.log('PCSC error', err.message);
    webContents.send(SmartCard.Listen, 'PCSC error', err.message);
  });
}
