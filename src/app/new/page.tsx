'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import api from '@/api';
import { Form, Header } from '@/components';
import type { Entry } from '@/types';

export default function NewContact() {
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
        ariaLabel="form"
        initialValues={{
          name: '',
          email: '',
          phoneNumber: '',
        }}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
