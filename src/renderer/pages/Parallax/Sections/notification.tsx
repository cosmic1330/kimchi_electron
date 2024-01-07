import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import useNotification from '../../../hooks/useNotification';
import Box from './style';

export default function Notification() {
  const { showNotification } = useNotification();
  const [type, setType] = useState<'electron' | 'browser' | undefined>(
    'electron',
  );
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  const handleChangeType = (event: ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value as 'electron' | 'browser');
  };

  const handleChangeBody = (event: ChangeEvent<HTMLInputElement>) => {
    setBody((event.target as HTMLInputElement).value);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle((event.target as HTMLInputElement).value);
  };
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h3" gutterBottom>
        Notification
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <Stack gap={3}>
              <TextField
                required
                label="Title"
                value={title}
                onChange={handleChangeTitle}
              />
              <TextField
                required
                label="Body"
                value={body}
                onChange={handleChangeBody}
              />
              <FormControl>
                <FormLabel>Type</FormLabel>
                <RadioGroup row value={type} onChange={handleChangeType}>
                  <FormControlLabel
                    value="electron"
                    control={<Radio />}
                    label="Electron"
                  />
                  <FormControlLabel
                    value="browser"
                    control={<Radio />}
                    label="Browser"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Stack justifyContent="center" alignItems="center" height="100%">
            <Button
              size="large"
              color="success"
              variant="contained"
              onClick={() => {
                showNotification(title, body, type);
              }}
            >
              Open Notification Box
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
