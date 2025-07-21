import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const loginMock = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../../../context/AuthContext', () => ({
  useAuthContext: () => ({
    login: loginMock,
  }),
}));

vi.mock('react-router-dom', async () => {
const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('axios');
const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(await screen.findByLabelText('Email')).toBeInTheDocument();
    expect(await screen.findByLabelText('Password')).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const button = await screen.findByRole('button', { name: /log in/i });
    await userEvent.click(button);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('logs in successfully', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue({
      data: { accessToken: 'fake-token' },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('fake-token');
      expect(mockNavigate).toHaveBeenCalledWith('/books');
    });
  });

  it('shows error on failed login', async () => {
    mockedAxios.post = vi.fn().mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
  });
});
