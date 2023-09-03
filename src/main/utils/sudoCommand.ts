import getAssetPath from './getAssetPath';

const sudo = require('sudo-prompt');

export default function sudoCommand(command: string) {
  const options = {
    name: 'Electron',
    icns: getAssetPath('icon.png'),
  };
  return new Promise((resolve, reject) => {
    sudo.exec(command, options, (error: any, stdout: string, stderr: any) => {
      if (error) {
        console.error('Error executing command:', error); // 輸出 error 訊息
        reject(error);
      } else {
        if (stderr) console.error('stderr:', stderr); // 輸出 stderr 訊息
        console.log('Command executed successfully.', stdout);
        resolve(stdout);
      }
    });
  });
}
