import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface BookCardProps {
  title: string;
  authors: string;
  cover?: string;
}

export const BookCard = ({ title, authors, cover }: BookCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden',
      }}
    >
      {cover && (
        <CardMedia
          component="img"
          image={cover}
          alt={title}
          sx={{ height: 240, objectFit: 'cover' }}
        />
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {authors}
        </Typography>
      </CardContent>
    </Card>
  );
};
