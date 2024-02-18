// https://www.gushiciku.cn/pl/g63r/zh-tw (未完成)
/* eslint-disable no-plusplus */
import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import Box from './style';

async function initSysEnv() {
  await fetch('http://127.0.0.1:4000/terminal', {
    method: 'POST',
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
}

async function asyncInitSysEnv(term: Terminal, socketURL: string) {
  const pid = await initSysEnv();
  const ws = new WebSocket(socketURL + pid);
  const attachAddon = new AttachAddon(ws);
  term.loadAddon(attachAddon);
}

function keyAction(term: Terminal, terminalTitleTemplate: string) {
  let currentLine = '';
  const history: string[] = [];
  // 1. 當使用者按下 Enter 鍵時，換行並顯示提示符號。
  term.onKey((e) => {
    const ev = e.domEvent;
    if (ev.keyCode === 13) {
      term.write('\r\n');
      term.write(`${terminalTitleTemplate}:`);
      if (currentLine !== '') {
        history.push(currentLine);
      }
      currentLine = '';
    } else if (
      ev.keyCode !== 8 &&
      ev.keyCode !== 9 &&
      ev.keyCode !== 38 &&
      ev.keyCode !== 40 &&
      ev.keyCode !== 37 &&
      ev.keyCode !== 39
    ) {
      currentLine += ev.key;
      term.write(ev.key);
    }
  });
  // 2. 當使用者按下 Backspace 鍵時，刪除前一個字元，刪除到root@localhost:前時，不再刪除。
  term.onKey((e) => {
    const ev = e.domEvent;
    if (ev.keyCode === 8) {
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1);
        term.write('\b \b');
      }
    }
  });
  // 3. 當使用者按下 Tab 鍵時，自動補齊指令。
  term.onKey((e) => {
    const ev = e.domEvent;
    if (ev.keyCode === 9) {
      term.write('  ');
    }
  });
  // 4. 當使用者按上下鍵時， 可以瀏覽指令歷史紀錄。
  term.onKey((e) => {
    const ev = e.domEvent;
    if (ev.keyCode === 38) {
      if (history.length > 0) {
        term.write('\b \b'.repeat(currentLine.length));
        currentLine = history.pop() || '';
        term.write(currentLine);
      }
    }
    if (ev.keyCode === 40) {
      if (history.length > 0) {
        term.write('\b \b'.repeat(currentLine.length));
        currentLine = history.shift() || '';
        term.write(currentLine);
      }
    }
  });
  // 5. 當使用者按左右鍵時
  // 6. 當輸入clear後按下Enter，清除之前的畫面。
  term.onKey((e) => {
    const ev = e.domEvent;
    if (ev.keyCode === 13) {
      if (history[history.length - 1] === 'clear') {
        term.clear();
      }
    }
  });
}

function initTerminal() {
  const term: any = new Terminal({
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    fontWeight: 400,
    fontSize: 14,
    rows: 20,
    cols: 100,
    cursorBlink: true,
    cursorStyle: 'underline',
  });
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(document.getElementById('terminal'));
  fitAddon.fit();
  term.focus();
  const terminalTitleTemplate = 'root@localhost';
  keyAction(term, terminalTitleTemplate);
  term.write(`\r\n${terminalTitleTemplate}:`);
  return term;
}

export default function WebTerminal() {
  useEffect(() => {
    const term = initTerminal();
    // asyncInitSysEnv(term, 'ws://127.0.0.1:4000/socket/');

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h3" gutterBottom>
        Web Terminal
      </Typography>
      <Box>
        <div id="terminal" />
      </Box>
    </Stack>
  );
}
