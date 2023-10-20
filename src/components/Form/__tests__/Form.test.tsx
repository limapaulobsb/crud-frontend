import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Form from '../Form';

const mockHandleSubmit = jest.fn((event) => event.preventDefault());

const emptyValues = {
  email: '',
  name: '',
  phoneNumber: '',
};

const initialValues = {
  email: 'limapaulobsb@gmail.com',
  name: 'Paulo',
  phoneNumber: '+55 61 993597997',
};

describe('Form', () => {
  describe('Render', () => {
    it('should render the inputs', () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={emptyValues}
          handleSubmit={mockHandleSubmit}
        />
      );

      // Act
      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');
      const phoneNumberInput = screen.getByPlaceholderText('Digite um telefone...');

      // Assert
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(phoneNumberInput).toBeInTheDocument();
    });

    it('should render a disabled submit button', () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={emptyValues}
          handleSubmit={mockHandleSubmit}
        />
      );

      // Act
      const button = screen.getByRole('button', { name: /salvar/i });

      // Assert
      expect(button).toBeDisabled();
    });

    it('should render filled inputs when passed non-empty initial values', () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={initialValues}
          handleSubmit={mockHandleSubmit}
        />
      );

      // Act
      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');
      const phoneNumberInput = screen.getByPlaceholderText('Digite um telefone...');

      // Assert
      expect(nameInput).toHaveValue('Paulo');
      expect(emailInput).toHaveValue('limapaulobsb@gmail.com');
      expect(phoneNumberInput).toHaveValue('+55 61 993597997');
    });

    it('should render disabled inputs when "disabled" prop is true', () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={initialValues}
          handleSubmit={mockHandleSubmit}
          disabled={true}
        />
      );

      // Act
      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');
      const phoneNumberInput = screen.getByPlaceholderText('Digite um telefone...');

      // Assert
      expect(nameInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(phoneNumberInput).toBeDisabled();
    });

    it('should not render the submit button when "disabled" prop is true', () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={initialValues}
          handleSubmit={mockHandleSubmit}
          disabled={true}
        />
      );

      // Act
      const button = screen.queryByRole('button', { name: /salvar/i });

      // Assert
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should be able to add text to the inputs', async () => {
      // Arrage
      render(
        <Form
          ariaLabel="form"
          initialValues={emptyValues}
          handleSubmit={mockHandleSubmit}
        />
      );

      // Act
      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');
      const phoneNumberInput = screen.getByPlaceholderText('Digite um telefone...');

      await userEvent.type(nameInput, 'Paulo');
      await userEvent.type(emailInput, 'limapaulobsb@gmail.com');
      await userEvent.type(phoneNumberInput, '+55 61 993597997');

      // Assert
      expect(nameInput).toHaveValue('Paulo');
      expect(emailInput).toHaveValue('limapaulobsb@gmail.com');
      expect(phoneNumberInput).toHaveValue('+55 61 993597997');
    });

    it('should enable the submit button when text is input', async () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={emptyValues}
          handleSubmit={mockHandleSubmit}
        />
      );

      // Act
      const nameInput = screen.getByPlaceholderText('Digite um nome...');
      const emailInput = screen.getByPlaceholderText('Digite um e-mail...');
      const phoneNumberInput = screen.getByPlaceholderText('Digite um telefone...');

      await userEvent.type(nameInput, 'Paulo');
      await userEvent.type(emailInput, 'limapaulobsb@gmail.com');
      await userEvent.type(phoneNumberInput, '+55 61 993597997');

      const button = screen.getByRole('button', { name: /salvar/i });

      // Assert
      expect(button).toBeEnabled();
    });

    it('should call handleSubmit when submitted', async () => {
      // Arrange
      render(
        <Form
          ariaLabel="form"
          initialValues={emptyValues}
          handleSubmit={mockHandleSubmit}
        />
      );

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
      expect(mockHandleSubmit).toBeCalled();
    });
  });
});
