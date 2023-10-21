import Link from 'next/link';
import styled from 'styled-components';

import type { ContactListProps } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Index = styled.div`
  font-size: 2rem;
  margin: 20px 0;
`;

const Avatar = styled.span`
  align-items: center;
  aspect-ratio: 1;
  background-color: rgb(210 90 90);
  border-radius: 50%;
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  justify-content: center;
  width: 30px;
`;

const List = styled.ol`
  background-color: black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 20px;

  & > li {
    align-items: center;
    display: flex;
    font-size: 1.2rem;
    gap: 10px;
    min-width: 300px;
  }
`;

export default function ContactList({ contacts }: ContactListProps) {
  if (contacts.length === 0) {
    return <Container>Sem registros.</Container>;
  }

  const chars = [];

  for (let i = 65; i <= 90; i++) {
    chars.push(String.fromCharCode(i));
  }

  return (
    <Container>
      {chars.map((char) => {
        const contactsWithChar = contacts
          .filter(({ name }) => name.charAt(0).toUpperCase() === char)
          .sort((a, b) => a.name.localeCompare(b.name));

        if (contactsWithChar.length === 0) {
          return null;
        }

        return (
          <div key={char}>
            <Index>{char}</Index>
            <List>
              {contactsWithChar.map(({ id, name }) => (
                <li key={id}>
                  <Avatar>{char}</Avatar>
                  <Link href={`/details/${id}`}>{name}</Link>
                </li>
              ))}
            </List>
          </div>
        );
      })}
    </Container>
  );
}
