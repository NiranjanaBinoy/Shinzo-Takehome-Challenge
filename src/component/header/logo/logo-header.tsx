import { Box, Typography } from '@mui/material';
import Logo from '../../../assets/logo.svg';
import RedLine from '../../../assets/red-header-line.svg';

/**
 * LogoHeader component displays the logo and title.
 * @returns {JSX.Element} - The rendered component.
 */
const LogoHeader = () => {
  return (
    <Box>
      <Box display="flex">
        <img src={Logo} alt="Logo" />
        <Typography variant="h6" fontWeight="300" fontSize={16} marginLeft={8}>
          DOJO
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <img src={RedLine} alt="Red Line" />
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="#D01F27" ml={1}>
          ブロックチェーンの心臓
        </Typography>
      </Box>
    </Box>
  );
};

export default LogoHeader;
