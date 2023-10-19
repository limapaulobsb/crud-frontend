'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import api from '@/api';
import { Form, Header } from '@/components';
import { MainButton } from '@/components/styled';
import type { Entry, ContactProps } from '@/types';

export default function Contact({ params }: ContactProps) {
  const [contact, setContact] = useState<null | Entry>(null);
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const id = params.id;

  const handleSubmit = async (event: FormEvent, inputValues: Entry) => {
    event.preventDefault();
    await api.updateContact(id, inputValues);
    setEditing(false);
  };

  const deleteContact = async () => {
    await api.deleteContact(id);
    router.push('/');
  };

  useEffect(() => {
    const getContact = async () => {
      const data = await api.fetchContact(id);
      if (Object.keys(data).length) setContact(data as Entry);
    };

    getContact();
  }, []);

  return (
    <main>
      <Header heading="Detalhes do contato" navLinks={[['/', 'Voltar']]} />
      {contact && (
        <Form handleSubmit={handleSubmit} initialValues={contact} disabled={!editing} />
      )}
      <MainButton type="button" onClick={() => setEditing(true)}>
        Editar
      </MainButton>
      <MainButton type="button" onClick={deleteContact}>
        Apagar
      </MainButton>
    </main>
  );
}
