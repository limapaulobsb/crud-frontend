import { render, screen } from '@testing-library/react';

import Home from '../page';

describe('Home', () => {
  it('should render a heading', () => {
    render(<Home />); // Arrange
    const myElem = screen.getByRole('heading', { name: /lista de contatos/i }); // Act
    expect(myElem).toBeInTheDocument(); // Assert
  });
});
