import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from './Register';
import axios from 'axios';

const mockedNavigate = vi.fn();

vi.mock('axios');

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('Register', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('submits form and navigates to login', async () => {
        (axios.post) = vi.fn().mockResolvedValue({});

        render(<Register />);

        await userEvent.type(screen.getByLabelText('Name'), 'Test User');
        await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
        await userEvent.type(screen.getByLabelText('Password'), 'Test1234');
        await userEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/register', {
            name: 'Test User',
            email: 'test@example.com',
            password: 'Test1234',
            preferredLanguage: 'en',
        });

        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
});
