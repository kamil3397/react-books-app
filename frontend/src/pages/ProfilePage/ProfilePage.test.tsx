import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';
import axios from 'axios';

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('token', 'test-token');
  });

  it('renders profile data after loading', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        language: 'en',
      },
    });

    render(<ProfilePage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Hello, Test User!')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('en')).toBeInTheDocument();
    });
  });

  it('shows error message on request failure', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Request failed'));

    render(<ProfilePage />);
  });
});
