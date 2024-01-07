import { Box as MuiBox, styled } from '@mui/material';

const Box = styled(MuiBox)`
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;
export default Box;
