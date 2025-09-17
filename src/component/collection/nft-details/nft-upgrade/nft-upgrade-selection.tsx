import { useState, type FC } from 'react';
import { Box, Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNFTContext } from '../../../../hook/useNFTContext';
import type { NFTDetails } from '../../../../types/types';

type NFTUpgradeSelectionProps = {
  nft: NFTDetails;
};
/**
 * NFTUpgradeSelection component for selecting NFTs to upgrade.
 * @param param0 - The props for the component.
 * @returns The rendered component.
 */
const NFTUpgradeSelection: FC<NFTUpgradeSelectionProps> = ({ nft }) => {
  const { selectedForUpgrade, handleUpgradeSelection } = useNFTContext();
  const [checked, setChecked] = useState<boolean>(false);
  const handleSelection = () => {
    if (checked) {
      const updatedTokenList = selectedForUpgrade.filter(
        (id) => id !== nft.tokenId
      );
      handleUpgradeSelection(updatedTokenList);
      setChecked(false);
    } else {
      if (
        selectedForUpgrade.length < 2 &&
        !selectedForUpgrade.includes(nft.tokenId)
      ) {
        setChecked(true);
        handleUpgradeSelection([...selectedForUpgrade, nft.tokenId]);
      } else {
        setChecked(false);
      }
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
      }}
    >
      <Checkbox
        checked={checked}
        onChange={handleSelection}
        icon={<RadioButtonUncheckedIcon sx={{ color: '#5E5E5E' }} />}
        checkedIcon={<CheckCircleIcon sx={{ color: '#D01F27' }} />}
      />
    </Box>
  );
};

export default NFTUpgradeSelection;
