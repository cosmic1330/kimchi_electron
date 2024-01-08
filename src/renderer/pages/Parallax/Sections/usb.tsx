import { Stack, Typography } from '@mui/material';
import useUsb from 'renderer/hooks/useUsb';
import Box from './style';

export default function Usb() {
  const { usblist } = useUsb();
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h3" gutterBottom>
        Usb
      </Typography>
      <Box>{usblist.map((item) => `${item}`)}</Box>
    </Stack>
  );
}
