import { platform } from 'node:process';

type PlateformFunctions = {
  [key in typeof platform]?: (props: unknown) => unknown;
};

export default function executePlateformFunction(
  platformFunctions: PlateformFunctions,
  props: unknown,
) {
  const runFunction = platformFunctions[platform] || null;

  if (runFunction && typeof runFunction === 'function') {
    return runFunction(props);
  }
  console.error(`Unsupported platform: ${platform}`);
  return null;
}
