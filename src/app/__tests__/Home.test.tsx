import { render, screen, within } from '@testing-library/react';

import Home from '../page';

describe('Home page', () => {
  it('should render a heading and navigation links', () => {
    // Arrange
    render(<Home />);

    // Act
    const heading = screen.getByRole('heading', { name: /lista de contatos/i });
    const link = screen.getByRole('link', { name: /novo contato/i });

    // Assert
    expect(heading).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/new');
  });

  it('should render the contact list with the correct number of items', async () => {
    // Arrange
    render(<Home />);

    // Act
    const listItems = await screen.findAllByRole('listitem');

    // Assert
    expect(listItems).toHaveLength(8);
  });
});
