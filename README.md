<img src=".erb/img/erb-banner.svg" width="100%" />

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/Fjy3vfgy5q)

[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate-594/sponsors/badge.svg)](#sponsors)
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

## Install

Clone the repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
npm install
```

**Having issues installing? See our [debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**


## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Xfreerdp and Ubuntu 20.04 desktop xrdp
In Linux you can use xfreerdp to connect to a windows machine.  This is a good way to test the app.

```bash
cd xfreerdp
docker-compose up -d
# test
docker exec -it xfreerdp  
```


## License
MIT © Kimchi Electron
