import type { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { shortenAddress } from '../../helpers/utils';
import { useNFTContext } from '../../hook/useNFTContext';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { normalize } from 'viem/ens';

/**
 * UserInfo component displays the user's address and ENS information.
 * @returns {JSX.Element} - The rendered component.
 */
const UserInfo: FC = () => {
  const { userAddress } = useNFTContext();
  const { data: ensName } = useEnsName({ address: userAddress });
  const { data: ensAvatar } = useEnsAvatar({
    name: normalize(ensName as string),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 4,
        marginLeft: 4,
      }}
    >
      <Avatar sx={{ bgcolor: '#6a3443' }}>{ensAvatar}</Avatar>
      <Typography
        sx={{ fontFamily: 'Pixelify Sans', fontWeight: 700, marginLeft: 2 }}
      >
        {shortenAddress(userAddress)}
      </Typography>
    </Box>
  );
};

export default UserInfo;
