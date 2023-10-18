'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import api from '@/api';
import { Header } from '@/components';
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
      <ul>
        {contacts.map((entry, index) => (
          <li key={index}>
            <Link href={`/details/${entry.id}`}>{entry.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
