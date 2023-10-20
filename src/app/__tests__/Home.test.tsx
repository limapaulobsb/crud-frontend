import { render, screen, within } from '@testing-library/react';

import Home from '../page';

describe('Home page', () => {
  it('should render a heading and navigation links', () => {
    // Arrange
    render(<Home />);

    // Act
    const heading = screen.getByRole('heading', { name: /lista de contatos/i });
    const link = screen.getByText('Novo contato');

    // Assert
    expect(heading).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/new');
  });

  it('should render the contact list with the correct number of items', async () => {
    // Arrange
    render(<Home />);

    // Act
    const list = screen.getByRole('list');
    const links = await within(list).findAllByRole('link');

    // Assert
    expect(links).toHaveLength(6);
  });
});
