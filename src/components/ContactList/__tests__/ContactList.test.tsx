import { render, screen } from '@testing-library/react';

import ContactList from '../ContactList';
import mockContacts from '@/mocks/mockContacts';

describe('ContactList', () => {
  it('should render all items in the correct order', () => {
    // Arrange
    render(<ContactList contacts={mockContacts} />);

    // Act
    const links = screen.getAllByRole('link');

    // Assert
    expect(links).toHaveLength(6);

    expect(links[0]).toHaveAttribute(
      'href',
      '/details/4c295000-ed75-4609-9437-faafc6efce34'
    );

    expect(links[0]).toHaveTextContent('André');

    expect(links[1]).toHaveAttribute(
      'href',
      '/details/a9881de2-79b8-4c65-80da-bbcb94268550'
    );

    expect(links[1]).toHaveTextContent('Bernardo');
  });
});
