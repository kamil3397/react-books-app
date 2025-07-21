import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from './BookCard';

describe('BookCard', () => {
  const defaultProps = {
    title: 'Test Book',
    authors: 'Author One, Author Two',
    cover: 'https://example.com/cover.jpg',
    isFavorite: false,
    onToggleFavorite: vi.fn(),
  };

  it('renders title and authors', async () => {
    render(<BookCard {...defaultProps} />);

    const title = await screen.findByText('Test Book');
    const authors = await screen.findByText('Author One, Author Two');

    expect(title).toBeInTheDocument();
    expect(authors).toBeInTheDocument();
  });

  it('renders cover image if provided', async () => {
    render(<BookCard {...defaultProps} />);

    const img = await screen.findByRole('img');
    expect(img).toHaveAttribute('src', defaultProps.cover);
    expect(img).toHaveAttribute('alt', defaultProps.title);
  });

  it('renders FavoriteBorderIcon when not favorite', async () => {
    render(<BookCard {...defaultProps} />);

    const icon = await screen.findByTestId('FavoriteBorderIcon');
    expect(icon).toBeInTheDocument();
  });

  it('renders FavoriteIcon when favorite', async () => {
    render(<BookCard {...defaultProps} isFavorite={true} />);

    const icon = await screen.findByTestId('FavoriteIcon');
    expect(icon).toBeInTheDocument();
  });

  it('calls onToggleFavorite when icon is clicked', async () => {
    render(<BookCard {...defaultProps} />);

    const button = await screen.findByRole('button');
    await userEvent.click(button);

    expect(defaultProps.onToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
