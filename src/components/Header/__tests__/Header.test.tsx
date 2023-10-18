import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header', () => {
  it('should render a heading', () => {
    render(<Header heading="Isso é um Header" />);
    const myElem = screen.getByRole('heading', { name: 'Isso é um Header' });
    expect(myElem).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(
      <Header
        heading="Isso é um Header"
        navLinks={[
          ['/contacts', 'Contatos'],
          ['/new', 'Novo contato'],
        ]}
      />
    );

    const elemArray = screen.getAllByRole('link');

    expect(elemArray.length).toBe(2);
    expect(elemArray[0]).toHaveAttribute('href', '/contacts');
    expect(elemArray[0]).toHaveTextContent('Contatos');
    expect(elemArray[1]).toHaveAttribute('href', '/new');
    expect(elemArray[1]).toHaveTextContent('Novo contato');
  });
});
