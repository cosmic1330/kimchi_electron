import { spawn } from 'child_process';

type SpawnRes = {
  stdout: string | null;
  stderr: string | null;
  error: unknown | null;
};

export default function asyncSpawn(
  path: string,
  options: string[],
): Promise<SpawnRes> {
  return new Promise((resolve) => {
    const cp = spawn('bash', [path, ...options]);
    const response: SpawnRes = {
      stdout: null,
      stderr: null,
      error: null,
    };
    cp.stdout.on('data', (data) => {
      response.stdout = `${response.stdout}\n${data}`;
    });

    cp.stderr.on('data', (data) => {
      response.stderr = `${data}`;
    });

    cp.on('error', (e) => {
      response.error = e;
    });

    cp.on('close', () => {
      resolve(response);
    });
  });
}
