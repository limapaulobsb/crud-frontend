import Link from 'next/link';

import type { ContactItemProps, ContactListProps } from '@/types';

function ContactItem({ contact }: ContactItemProps) {
  return (
    <li>
      <Link href={`/details/${contact.id}`}>{contact.name}</Link>
    </li>
  );
}

export default function ContactList({ contacts }: ContactListProps) {
  const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul>
      {sortedContacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} />
      ))}
    </ul>
  );
}
