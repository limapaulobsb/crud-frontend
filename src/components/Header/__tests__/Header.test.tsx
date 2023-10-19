import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header', () => {
  it('should render a heading', () => {
    // Arrange
    render(<Header heading="Isso é um Header" />);

    // Act
    const heading = screen.getByRole('heading', { name: 'Isso é um Header' });

    // Assert
    expect(heading).toBeInTheDocument();
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
    const links = screen.getAllByRole('link');

    // Assert
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/contacts');
    expect(links[0]).toHaveTextContent('Contatos');
    expect(links[1]).toHaveAttribute('href', '/new');
    expect(links[1]).toHaveTextContent('Novo contato');
  });
});
