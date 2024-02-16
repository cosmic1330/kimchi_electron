import { Button, Stack, Typography } from '@mui/material';
import useUpdater from 'renderer/hooks/useUpdater';
import icon from '../../../../../assets/icon.svg';

export default function Version() {
  const { process } = useUpdater();
  const onClick = () => window.electron.updater.restart();
  return (
    <Stack justifyContent="center" alignItems="center">
      <div>
        <img width="200" alt="icon" src={icon} />
      </div>
      <Typography variant="h2">App Version</Typography>
      <Typography variant="h5">
        {window.electron.ipcRenderer.version()}
      </Typography>
      <Button onClick={onClick}>Recheck New Version</Button>
      <Typography variant="h2">Process: {process}</Typography>
    </Stack>
  );
}
