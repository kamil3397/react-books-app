import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

interface BookCardProps {
  title: string
  authors: string
  cover?: string
  isFavorite: boolean
  onToggleFavorite: () => void
}

export const BookCard = ({ title, authors, cover, isFavorite, onToggleFavorite }: BookCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden',
        position: 'relative',
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

      <IconButton
        onClick={onToggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'error.main',
          zIndex: 1,
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

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
          sx={{overflow: 'hidden'}}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{overflow: 'hidden'}}
        >
          {authors}
        </Typography>
      </CardContent>
    </Card>
  )
}
