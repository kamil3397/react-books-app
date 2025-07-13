import { Card, CardContent, CardMedia, Typography, IconButton, Container } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface BookCardProps {
  title: string;
  authors: string;
  cover?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const BookCard = ({ title, authors, cover, isFavorite, onToggleFavorite }: BookCardProps) => {
  return (
    <Card>
      {cover && (
        <CardMedia component="img" image={cover} alt={title} />
      )}

      <IconButton onClick={onToggleFavorite}>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardContent>
        <Container disableGutters>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {authors}
          </Typography>
        </Container>
      </CardContent>
    </Card>
  );
};
