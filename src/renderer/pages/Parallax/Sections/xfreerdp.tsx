import { Button, Stack, Typography } from '@mui/material';
import useXfreerdp from 'renderer/hooks/useXfreerdp';

export default function Xfreerdp() {
  const { openXfreerdp } = useXfreerdp();

  const handleOpen = () => {
    openXfreerdp('ubuntu', 'ubuntu', '127.0.0.1:143891');
  };
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h3" gutterBottom>
        Xfreerdp
      </Typography>
      <Button onClick={handleOpen}>Open</Button>
    </Stack>
  );
}
