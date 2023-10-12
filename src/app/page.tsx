'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import api from '@/api';
import type { Entry } from '@/types';

export default function Home() {
  const [contacts, setContacts] = useState<Entry[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      const data = await api.getContacts();
      setContacts(data);
    };

    getContacts();
  }, []);

  return (
    <main>
      <header>
        <h1>Lista de contatos</h1>
        <nav>
          <Link href={'/new'}>Novo contato</Link>
        </nav>
      </header>
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
