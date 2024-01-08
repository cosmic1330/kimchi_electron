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
  // 定义变量获取整行数据
  let currentLineData = '';
  // 历史行输入数据
  const historyLineData: any[] = [];
  let last = 0;
  // 使其能够输入汉字
  term.onData(async (key) => {
    // enter键
    if (key.charCodeAt(0) === 13) {
      // 将行数据进行添加进去
      if (currentLineData !== '') {
        // 将当前行数据传入历史命令数组中存储
        historyLineData.push(currentLineData);
        // 定义当前行命令在整个数组中的位置
        last = historyLineData.length - 1;
      }
      // 当输入clear时清空终端内容
      if (currentLineData === 'clear') {
        term.clear();
      }

      // 在这可以进行发起请求将整行数据传入

      // 清空当前行数据
      currentLineData = '';

      term.write(`\r\n${terminalTitleTemplate}: `);
    } else if (key.charCodeAt(0) === 127) {
      // 删除键
      // 判断当前行数据是否为空
      if (currentLineData !== '') {
        // 删除当前行数据
        currentLineData = currentLineData.substr(0, currentLineData.length - 1);
        // 删除终端最后一个字符
        term.write('\b \b');
      }
    } else if (key === '\u001b[A') {
      // up键的时候
      let len = 0;
      if (historyLineData.length > 0) {
        len = historyLineData.length + 1;
      }

      if (last < len && last > 0) {
        const text = historyLineData[last - 1];
        term.write(text);
        // 重点，一定要记住存储当前行命令保证下次up或down时不会光标错乱覆盖终端提示符
        currentLineData = text;

        last--;
      }
    } else if (key === '\u001b[B') {
      // down键
      let lent = 0;
      if (historyLineData.length > 0) {
        lent = historyLineData.length - 1;
      }
      if (last < lent && last > -1) {
        const text = historyLineData[last + 1];
        term.write(text);
        currentLineData = text;
        last++;
      }
    } else {
      // 啥也不做的时候就直接输入
      currentLineData += key;
      term.write(key);
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
    asyncInitSysEnv(term, 'ws://127.0.0.1:4000/socket/');

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
