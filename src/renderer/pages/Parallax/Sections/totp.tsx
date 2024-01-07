import {
  Button,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import useTopt from 'renderer/hooks/useTopt';
import Box from './style';

export default function Totp() {
  const {
    qrCode,
    isValidate,
    customTopt,
    check,
    refreshCustomTopt,
    generateOtpauth,
  } = useTopt();
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h3" gutterBottom>
        2FA-TOPT驗證
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">生成Qrcode</Typography>
          <Box mt={1} style={{ display: 'flex', justifyContent: 'center' }}>
            {qrCode ? (
              <img src={qrCode} alt="QR Code" />
            ) : (
              <Skeleton variant="rectangular" width={196} height={196} />
            )}

            <Button variant="contained" onClick={generateOtpauth}>
              生成
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">請掃描並輸入驗證碼:</Typography>
          <Box mt={1}>
            <TextField
              label="輸入Totp驗證碼"
              variant="standard"
              onChange={check}
            />
            <Typography variant="subtitle1">
              驗證結果:{' '}
              <Typography
                variant="button"
                color={isValidate ? 'success.main' : 'common.white'}
              >
                {isValidate ? '正確' : '錯誤'}
              </Typography>
            </Typography>
          </Box>

          <Typography my={1} variant="subtitle1">
            TOPT碼
          </Typography>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography mt={1} variant="h5" color="common.black">
                {customTopt}
              </Typography>
              <Button variant="contained" onClick={refreshCustomTopt}>
                刷新
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
