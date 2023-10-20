import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

import api from '@/api';
import NewContact from '../page';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

beforeEach(() => {
  mockRouter.push('/new');
});

describe('NewContact page', () => {
  describe('Render', () => {
    it('should render a heading and navigation links', () => {
      // Arrange
      render(<NewContact />);

      // Act
      const heading = screen.getByRole('heading', { name: /novo contato/i });
      const link = screen.getByRole('link', { name: /voltar/i });

      // Assert
      expect(heading).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });

    it('should render a form with empty inputs', () => {
      // Arrange
      render(<NewContact />);

      // Act
      const form = screen.getByRole('form');
      const button = screen.getByRole('button', { name: /salvar/i });

      // Assert
      expect(form).toHaveFormValues({
        name: '',
        email: '',
        phoneNumber: '',
      });

      expect(button).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should create a new contact and redirect to the Home page', async () => {
      const apiSpy = jest.spyOn(api, 'createContact');

      // Arrange
      render(<NewContact />);

      // Act
      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');
      const phoneNumberInput = screen.getByPlaceholderText('Digite um telefone...');

      await userEvent.type(nameInput, 'Paulo');
      await userEvent.type(emailInput, 'limapaulobsb@gmail.com');
      await userEvent.type(phoneNumberInput, '+55 61 993597997');

      const button = screen.getByRole('button', { name: /salvar/i });
      await userEvent.click(button);

      // Assert
      expect(apiSpy).toBeCalledWith({
        name: 'Paulo',
        email: 'limapaulobsb@gmail.com',
        phoneNumber: '+55 61 993597997',
      });

      expect(mockRouter.asPath).toBe('/');

      apiSpy.mockRestore();
    });
  });
});
