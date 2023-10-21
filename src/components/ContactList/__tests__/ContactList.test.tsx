import { render, screen } from '@testing-library/react';

import ContactList from '../ContactList';
import mockContacts from '@/mocks/mockContacts';

describe('ContactList', () => {
  it('should render the correct indexes', () => {
    // Arrange
    render(<ContactList contacts={mockContacts} />);

    // Act
    const lists = screen.getAllByRole('list');
    const indexA = screen.getByText('A', { selector: 'div' });
    const indexZ = screen.queryByText('Z');

    // Assert
    expect(lists).toHaveLength(7);
    expect(indexA).toBeInTheDocument();
    expect(indexZ).not.toBeInTheDocument();
  });

  it('should render all items in the correct order', () => {
    // Arrange
    render(<ContactList contacts={mockContacts} />);

    // Act
    const links = screen.getAllByRole('link');

    // Assert
    expect(links).toHaveLength(8);
    expect(links[0]).toHaveAttribute('href', '/details/JNGvANo');
    expect(links[0]).toHaveTextContent('André');
    expect(links[1]).toHaveAttribute('href', '/details/t9K9lwB');
    expect(links[1]).toHaveTextContent('Bernardo');
  });

  it('should render a message when "contacts" prop is an empty array', () => {
    // Arrange
    render(<ContactList contacts={[]} />);

    // Act
    const element = screen.getByText('Sem registros.');

    // Assert
    expect(element).toBeInTheDocument();
  });
});
