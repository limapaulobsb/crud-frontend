'use client';
import React, { FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import api from '@/api';
import { Form, Header } from '@/components';
import type { Entry } from '@/types';

export default function newContact() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent, inputValues: Entry) => {
    event.preventDefault();
    await api.createContact(inputValues);
    router.push('/');
  };

  return (
    <main>
      <Header heading="Novo contato" navLinks={[['/', 'Voltar']]} />
      <Form
        handleSubmit={handleSubmit}
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
        }}
      />
    </main>
  );
}
