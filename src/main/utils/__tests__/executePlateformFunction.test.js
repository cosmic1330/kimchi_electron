import executePlateformFunction from '../executePlateformFunction';

describe('executePlateform function', () => {
  // 定义不同平台下的函数
  function runOnMacOS({ name, password }) {
    console.log(
      `Running on macOS with name: ${name} and password: ${password}`,
    );
    return 'darwin';
  }

  function runOnLinux({ name, password }) {
    console.log(
      `Running on Linux with name: ${name} and password: ${password}`,
    );
    return 'linux';
  }

  function runOnWindows({ name, password }) {
    console.log(
      `Running on Windows with name: ${name} and password: ${password}`,
    );
    return 'win32';
  }

  it('should run plateform', () => {
    const props = { name: 'John', password: 'secret' };
    const someInput = {
      darwin: runOnMacOS,
      linux: runOnLinux,
      win32: runOnWindows,
    };
    const result = executePlateformFunction(someInput, props);
    expect(result).toEqual(process.platform);
  });
});
