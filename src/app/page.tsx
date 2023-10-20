'use client';

import { useEffect, useState } from 'react';

import api from '@/api';
import { ContactList, Header } from '@/components';
import type { Entry } from '@/types';

export default function Home() {
  const [contacts, setContacts] = useState<Entry[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      const data = await api.fetchContacts();

      if (data.length) {
        setContacts(data);
      }
    };

    getContacts();
  }, []);

  return (
    <main>
      <Header heading="Lista de contatos" navLinks={[['/new', 'Novo contato']]} />
      <ContactList contacts={contacts} />
    </main>
  );
}
