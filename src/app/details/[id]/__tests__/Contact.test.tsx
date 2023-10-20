import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import api from '@/api';
import Contact from '../page';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

beforeEach(() => {
  mockRouter.push('/details/2DNW3qN');
});

describe('Contact page', () => {
  describe('Render', () => {
    it('should render a heading and navigation links', () => {
      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const heading = screen.getByRole('heading', { name: /detalhes do contato/i });
      const link = screen.getByRole('link', { name: /voltar/i });

      // Assert
      expect(heading).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });

    it('should render a disabled form with filled inputs', async () => {
      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const form = await screen.findByRole('form');
      const button = screen.queryByRole('button', { name: /salvar/i });

      // Assert
      expect(form).toHaveFormValues({
        name: 'Vitória',
        email: 'vitoria@gmail.com',
        phoneNumber: '+55 99 99999999',
      });

      expect(button).not.toBeInTheDocument();
    });

    it('should render buttons to edit and delete the contact', () => {
      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const editButton = screen.getByRole('button', { name: /editar/i });
      const deleteButton = screen.getByRole('button', { name: /apagar/i });

      // Assert
      expect(editButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should toggle form when edit button is clicked', async () => {
      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const editButton = screen.getByRole('button', { name: /editar/i });
      await userEvent.click(editButton);

      const submitButton = screen.getByRole('button', { name: /salvar/i });

      // Assert
      expect(submitButton).toBeInTheDocument();
    });

    it('should update the contact when submitted', async () => {
      const apiSpy = jest.spyOn(api, 'updateContact');

      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const editButton = screen.getByRole('button', { name: /editar/i });
      await userEvent.click(editButton);

      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');

      await userEvent.clear(nameInput);
      await userEvent.clear(emailInput);
      await userEvent.type(nameInput, 'Amorzão');
      await userEvent.type(emailInput, 'amorzao@gmail.com');

      const submitButton = screen.getByRole('button', { name: /salvar/i });
      await userEvent.click(submitButton);

      // Assert
      expect(apiSpy).toBeCalledWith('2DNW3qN', {
        name: 'Amorzão',
        email: 'amorzao@gmail.com',
        phoneNumber: '+55 99 99999999',
      });

      await waitFor(() => {
        expect(submitButton).not.toBeInTheDocument();
      });

      apiSpy.mockRestore();
    });

    it('should delete the contact when the confirmation is positive', async () => {
      const apiSpy = jest.spyOn(api, 'deleteContact');
      const confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));

      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const deleteButton = screen.getByRole('button', { name: /apagar/i });
      await userEvent.click(deleteButton);

      // Assert
      expect(confirmSpy).toBeCalled();
      expect(apiSpy).toBeCalledWith('2DNW3qN');
      expect(mockRouter.asPath).toBe('/');

      apiSpy.mockRestore();
      confirmSpy.mockRestore();
    });

    it('should not delete the contact when the confirmation is negative', async () => {
      const apiSpy = jest.spyOn(api, 'deleteContact');
      const confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => false));

      // Arrange
      render(<Contact params={{ id: '2DNW3qN' }} />);

      // Act
      const deleteButton = screen.getByRole('button', { name: /apagar/i });
      await userEvent.click(deleteButton);

      // Assert
      expect(confirmSpy).toBeCalled();
      expect(apiSpy).not.toBeCalled();
      expect(mockRouter.asPath).toBe('/details/2DNW3qN');

      apiSpy.mockRestore();
      confirmSpy.mockRestore();
    });
  });
});
