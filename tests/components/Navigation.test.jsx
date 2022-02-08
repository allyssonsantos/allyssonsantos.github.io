import React from 'react';
import userEvent from '@testing-library/user-event';

import Navigation from '@components/Layout/Navigation';
import { login } from '@contexts/AuthContext';

import { items, socials } from './fixtures/navigationLinks';
import { render, screen, waitFor } from '../utils';

jest.mock('@contexts/AuthContext', () => ({
  ...jest.requireActual('@contexts/AuthContext'),
  login: jest.fn(),
}));

jest.useFakeTimers();

describe('Navigation component', () => {
  describe('Displaying', () => {
    it('should show loading when loading user', () => {
      const onMenuClickMock = jest.fn();
      render(
        <Navigation
          items={items}
          socials={socials}
          onMenuClick={onMenuClickMock}
          opened
        />,
        {
          loadingUser: true,
        }
      );

      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should show login button', () => {
      const onMenuClickMock = jest.fn();
      render(
        <Navigation
          items={items}
          socials={socials}
          onMenuClick={onMenuClickMock}
          opened
        />,
        {
          loadingUser: false,
        }
      );

      expect(screen.getByText(/entrar/i)).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should change theme color when click on theme button', () => {
      const onMenuClickMock = jest.fn();

      render(
        <Navigation
          items={items}
          socials={socials}
          onMenuClick={onMenuClickMock}
          opened
        />,
        {
          loadingUser: false,
        }
      );

      userEvent.click(screen.getByTitle(/trocar para tema light/i));

      expect(screen.getByTitle(/trocar para tema dark/i)).toBeInTheDocument();
      expect(
        screen.queryByTitle(/trocar para tema light/i)
      ).not.toBeInTheDocument();
      waitFor(() =>
        expect(window.localStorage.getItem('dark-theme')).toBe('dark')
      );
    });

    it('should close menu when click on close menu button', () => {
      const onMenuClickMock = jest.fn();

      render(
        <Navigation
          items={items}
          socials={socials}
          onMenuClick={onMenuClickMock}
          opened
        />,
        {
          loadingUser: false,
        }
      );

      userEvent.click(screen.getByLabelText(/fechar menu/i));

      expect(onMenuClickMock).toHaveBeenCalledTimes(1);
    });

    it('should open login modal when click on login button', () => {
      const onMenuClickMock = jest.fn();

      render(
        <Navigation
          items={items}
          socials={socials}
          onMenuClick={onMenuClickMock}
          opened
        />,
        {
          loadingUser: false,
        }
      );

      userEvent.click(screen.getByText(/entrar/i));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading').textContent).toMatchInlineSnapshot(
        `"Escolha uma forma de login:"`
      );
    });

    it('should login when click on login with google button', () => {
      const onMenuClickMock = jest.fn();

      render(
        <Navigation
          items={items}
          socials={socials}
          onMenuClick={onMenuClickMock}
          opened
        />,
        {
          loadingUser: false,
        }
      );

      userEvent.click(screen.getByText(/entrar/i));
      userEvent.click(
        screen.getByLabelText(/entre utilizando sua conta do google/i)
      );

      expect(login).toHaveBeenCalledTimes(1);
    });
  });
});
