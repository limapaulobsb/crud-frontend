import { render, screen } from '@testing-library/react';

import Home from '../page';

describe('Home', () => {
  it('should render a heading', () => {
    // Arrange
    render(<Home />);

    // Act
    const myElem = screen.getByRole('heading', { name: /lista de contatos/i });

    // Assert
    expect(myElem).toBeInTheDocument();
  });
});
