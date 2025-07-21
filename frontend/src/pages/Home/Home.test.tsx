import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from './Home';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading and navigates to register', async () => {
    render(<Home />);

    expect(await screen.findByText(/discover timeless books/i)).toBeInTheDocument();

    const button = await screen.findByRole('button', { name: /get started/i });
    await userEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/register');
  });
});
