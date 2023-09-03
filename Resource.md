## Task1
功能: 建立自動更新機制

參考資料:
- [electron 自动更新安装 electron-updater 自动更新安装](https://juejin.cn/post/7202904269536133178)

## Task2
功能: 使用最高權限執行 script

參考資料:
- [sudo-prompt](https://www.npmjs.com/package/sudo-prompt)

啟用範例:
```js
setTimeout(async () => {
  try {
    const res = await window.electron.ipcRenderer.sudo('net session');
    console.log('res', res);
  } catch (error) {
    console.log('error', error);
  }
}, 5000);
```
