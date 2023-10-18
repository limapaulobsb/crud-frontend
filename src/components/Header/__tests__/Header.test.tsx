import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header', () => {
  it('should render a heading', () => {
    // Arrange
    render(<Header heading="Isso é um Header" />);

    // Act
    const myElem = screen.getByRole('heading', { name: 'Isso é um Header' });

    // Assert
    expect(myElem).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    // Arrange
    render(
      <Header
        heading="Isso é um Header"
        navLinks={[
          ['/contacts', 'Contatos'],
          ['/new', 'Novo contato'],
        ]}
      />
    );

    // Act
    const elemArray = screen.getAllByRole('link');

    // Assert
    expect(elemArray.length).toBe(2);
    expect(elemArray[0]).toHaveAttribute('href', '/contacts');
    expect(elemArray[0]).toHaveTextContent('Contatos');
    expect(elemArray[1]).toHaveAttribute('href', '/new');
    expect(elemArray[1]).toHaveTextContent('Novo contato');
  });
});
