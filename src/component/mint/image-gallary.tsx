import { Box, Card, CardMedia, Stack } from '@mui/material';
import { images } from '../../constant/images';
import { useState } from 'react';

/**
 * ImageGallery component displays a gallery of images with a main view and thumbnails.
 * @returns {JSX.Element} - The rendered component.
 */
const ImageGallery = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <Box sx={{ width: '100%', maxWidth: 355, mx: 'auto' }}>
      {/* Main Image */}
      <Card sx={{ marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={images[selected].src}
          alt={images[selected].alt}
          sx={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </Card>
      {/* Thumbnails */}
      <Stack direction="row" spacing={2} sx={{ overflowX: 'auto' }}>
        {images.map((img, idx) => (
          <Card
            onClick={() => setSelected(idx)}
            sx={{
              border: 1,
              borderColor: '#4C0000',
              minWidth: 75,
              minHeight: 75,
            }}
          >
            <CardMedia
              component="img"
              image={img.src}
              alt={img.alt}
              sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
export default ImageGallery;
