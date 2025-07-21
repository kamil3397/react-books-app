import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';
import { BrowserRouter } from 'react-router-dom';

let isLoggedIn = true;
const logoutMock = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  useAuthContext: () => ({
    isLoggedIn,
    logout: logoutMock,
  }),
}));

describe('Navbar', () => {
  beforeEach(() => {
    logoutMock.mockClear();
  });

  it('renders core links (Books, Favorites, Profile)', async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(await screen.findByText('Books')).toBeInTheDocument();
    expect(await screen.findByText('Favorites')).toBeInTheDocument();
    expect(await screen.findByText('Profile')).toBeInTheDocument();
  });

  it('shows logout button when logged in', async () => {
    isLoggedIn = true;

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logoutBtn = await screen.findByText('Logout');
    expect(logoutBtn).toBeInTheDocument();
  });

  it('shows login button when not logged in', async () => {
    isLoggedIn = false;

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const loginBtn = await screen.findByText('Login');
    expect(loginBtn).toBeInTheDocument();
  });

  it('calls logout when logout button clicked', async () => {
    isLoggedIn = true;

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logoutBtn = await screen.findByText('Logout');
    await userEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
