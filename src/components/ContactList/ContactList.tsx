import Link from 'next/link';

import type { ContactListProps } from '@/types';

export default function ContactList({ contacts }: ContactListProps) {
  if (contacts.length === 0) {
    return <div data-testid="contact-list">Sem registros.</div>;
  }

  const chars = [];

  for (let i = 65; i <= 90; i++) {
    chars.push(String.fromCharCode(i));
  }

  return (
    <div data-testid="contact-list">
      {chars.map((char) => {
        const contactsWithChar = contacts
          .filter(({ name }) => name.charAt(0).toUpperCase() === char)
          .sort((a, b) => a.name.localeCompare(b.name));

        if (contactsWithChar.length === 0) {
          return null;
        }

        return (
          <ol key={char}>
            <span>{char}</span>
            {contactsWithChar.map(({ id, name }) => (
              <li key={id}>
                <Link href={`/details/${id}`}>{name}</Link>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
