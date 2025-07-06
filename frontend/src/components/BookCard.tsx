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
    <Card className="BookCard">
      {cover && (
        <CardMedia
          component="img"
          image={cover}
          alt={title}
          className="BookCardImage"
        />
      )}

      <IconButton onClick={onToggleFavorite} className="BookCardFavorite">
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <CardContent className="BookCardContent">
        <Container disableGutters className="BookCardTextWrapper">
          <Typography variant="subtitle1" className="BookCardTitle">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="BookCardAuthor">
            {authors}
          </Typography>
        </Container>
      </CardContent>
    </Card>
  );
};
