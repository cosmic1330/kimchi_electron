import { SmartCard } from '../channels';

const pcsclite = require('@pokusew/pcsclite');
const { NFC } = require('nfc-pcsc');

export function getSmartCardInfo(webContents: Electron.WebContents) {
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
            webContents.send(SmartCard.Listen, 'info', `protocol ${protocol}`);

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

export function getNFTCardInfo(webContents: Electron.WebContents) {
  webContents.send(SmartCard.Listen, 'info', `NFT 執行`);

  const nfc = new NFC(console); // optionally you can pass logger

  nfc.on('reader', (reader) => {
    console.log(`${reader.reader.name}  device attached`);
    reader.autoProcessing = false;

    // enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
    // when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
    // the response is available as card.data in the card event
    // you can set reader.aid to:
    // 1. a HEX string (which will be parsed automatically to Buffer)
    // reader.aid = 'F222222222';
    // 2. an instance of Buffer containing the AID bytes
    // reader.aid = Buffer.from('F222222222', 'hex');
    // 3. a function which must return an instance of a Buffer when invoked with card object (containing standard and atr)
    //    the function may generate AIDs dynamically based on the detected card
    // reader.aid = ({ standard, atr }) => {
    //   return Buffer.from('F222222222', 'hex');
    // };

    reader.on('card', (card) => {
      // card is object containing following data
      // [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
      // [always] String standard: same as type
      // [only TAG_ISO_14443_3] String uid: tag uid
      // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

      console.log(`${reader.reader.name}  card detected`, card);
    });

    reader.on('card.off', (card) => {
      console.log(`${reader.reader.name}  card removed`, card);
    });

    reader.on('error', (err) => {
      console.log(`${reader.reader.name}  an error occurred`, err);
    });

    reader.on('end', () => {
      console.log(`${reader.reader.name}  device removed`);
    });
  });

  nfc.on('error', (err) => {
    console.log('an error occurred', err);
  });
}
