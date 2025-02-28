import { Card, CardContent, Box, Typography } from '@mui/material';
import { CustomCardProps } from '../../app/models/dashboard'



export default function CustomCard({ image, title, description }: CustomCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        height: 300,
        width: 300,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)', // Dims image for text contrast
        }}
      />

      {/* Overlay Content */}
      <CardContent
        sx={{
          position: 'absolute',
          bottom: 0,
          color: 'white',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.4)', // Slight dark background for readability
          padding: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" mt={1}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
