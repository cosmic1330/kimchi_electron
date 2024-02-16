# Updater Server

## 1. Change application version and publish
By default, publishing is on GitHub. Please update the local server and ensure that the version is greater than the current version.

```js
// package.json
    ...
    "publish": {
      "provider": "generic",
      "url": "http://localhost:8099/"
    }
    ...
```
> 不使用array，使用array也只會檢查array[0]

```js
// release/app/package.json
    ...
    "version":" 0.0.2", // bigger than current version
    ...
```

## 2. Package application and get latest installation file.
```cmd
npm run package
```

```js
+
│  
└─release/app/build
      ElectronReact Setup 0.2.2.exe
      ElectronReact Setup 0.2.2.exe.blockmap        
      latest.yml
```

## 3. Running the server and application auto update
```js
node update_server/server.js 
```
