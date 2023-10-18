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
      render(<Form handleSubmit={mockHandleSubmit} initialValues={emptyValues} />);

      // Act
      const inputOne = screen.getByPlaceholderText('Digite um nome...');
      const inputTwo = screen.getByPlaceholderText('Digite um e-mail...');
      const inputThree = screen.getByPlaceholderText('Digite um telefone...');

      // Assert
      expect(inputOne).toBeInTheDocument();
      expect(inputTwo).toBeInTheDocument();
      expect(inputThree).toBeInTheDocument();
    });

    it('should render a disabled submit button', () => {
      // Arrange
      render(<Form handleSubmit={mockHandleSubmit} initialValues={emptyValues} />);

      // Act
      const button = screen.getByRole('button', { name: 'Salvar' });

      // Assert
      expect(button).toBeDisabled(); // Assert
    });

    it('should render filled inputs when passed non-empty initial values', () => {
      // Arrange
      render(<Form handleSubmit={mockHandleSubmit} initialValues={initialValues} />);

      // Act
      const inputOne = screen.getByPlaceholderText('Digite um nome...');
      const inputTwo = screen.getByPlaceholderText('Digite um e-mail...');
      const inputThree = screen.getByPlaceholderText('Digite um telefone...');

      // Assert
      expect(inputOne).toHaveValue('Paulo');
      expect(inputTwo).toHaveValue('limapaulobsb@gmail.com');
      expect(inputThree).toHaveValue('+55 61 993597997');
    });

    it('should render disabled inputs when "disabled" prop is true', () => {
      // Arrange
      render(
        <Form
          handleSubmit={mockHandleSubmit}
          initialValues={initialValues}
          disabled={true}
        />
      );

      // Act
      const inputOne = screen.getByPlaceholderText('Digite um nome...');
      const inputTwo = screen.getByPlaceholderText('Digite um e-mail...');
      const inputThree = screen.getByPlaceholderText('Digite um telefone...');

      // Assert
      expect(inputOne).toBeDisabled();
      expect(inputTwo).toBeDisabled();
      expect(inputThree).toBeDisabled();
    });

    it('should not render the submit button when "disabled" prop is true', () => {
      // Arrange
      render(
        <Form
          handleSubmit={mockHandleSubmit}
          initialValues={initialValues}
          disabled={true}
        />
      );

      // Act
      const button = screen.queryByRole('button', { name: 'Salvar' });

      // Assert
      expect(button).not.toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should be able to add text to the inputs', async () => {
      // Arrage
      render(<Form handleSubmit={mockHandleSubmit} initialValues={emptyValues} />);

      // Act
      const inputOne = screen.getByPlaceholderText('Digite um nome...');
      const inputTwo = screen.getByPlaceholderText('Digite um e-mail...');
      const inputThree = screen.getByPlaceholderText('Digite um telefone...');

      await userEvent.type(inputOne, 'Paulo');
      await userEvent.type(inputTwo, 'limapaulobsb@gmail.com');
      await userEvent.type(inputThree, '+55 61 993597997');

      // Assert
      expect(inputOne).toHaveValue('Paulo');
      expect(inputTwo).toHaveValue('limapaulobsb@gmail.com');
      expect(inputThree).toHaveValue('+55 61 993597997');
    });

    it('should enable the submit button when text is input', async () => {
      // Arrange
      render(<Form handleSubmit={mockHandleSubmit} initialValues={emptyValues} />);

      // Act
      const inputOne = screen.getByPlaceholderText('Digite um nome...');
      const inputTwo = screen.getByPlaceholderText('Digite um e-mail...');
      const inputThree = screen.getByPlaceholderText('Digite um telefone...');

      await userEvent.type(inputOne, 'Paulo');
      await userEvent.type(inputTwo, 'limapaulobsb@gmail.com');
      await userEvent.type(inputThree, '+55 61 993597997');

      const button = screen.getByRole('button', { name: 'Salvar' });

      // Assert
      expect(button).toBeEnabled();
    });

    it('should call handleSubmit when submitted', async () => {
      // Arrange
      render(<Form handleSubmit={mockHandleSubmit} initialValues={emptyValues} />);

      // Act
      const inputOne = screen.getByPlaceholderText('Digite um nome...');
      const inputTwo = screen.getByPlaceholderText('Digite um e-mail...');
      const inputThree = screen.getByPlaceholderText('Digite um telefone...');

      await userEvent.type(inputOne, 'Paulo');
      await userEvent.type(inputTwo, 'limapaulobsb@gmail.com');
      await userEvent.type(inputThree, '+55 61 993597997');

      const button = screen.getByRole('button', { name: 'Salvar' });

      await userEvent.click(button);

      // Assert
      expect(mockHandleSubmit).toBeCalled();
    });
  });
});
