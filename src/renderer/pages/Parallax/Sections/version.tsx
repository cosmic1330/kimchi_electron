import { Stack, Typography } from '@mui/material';
import icon from '../../../../../assets/icon.svg';

export default function Version() {
  return (
    <Stack justifyContent="center" alignItems="center">
      <div>
        <img width="200" alt="icon" src={icon} />
      </div>
      <Typography variant="h2">App Version</Typography>
      <Typography variant="h5">
        {window.electron.ipcRenderer.version()}
      </Typography>
    </Stack>
  );
}
