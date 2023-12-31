'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import api from '@/api';
import { Form, Header } from '@/components';
import { MainButton } from '@/components/styled';
import type { Entry, ContactProps } from '@/types';

const Container = styled.main`
  & > div {
    display: flex;
    gap: 20px;
  }
`;

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
    if (confirm('Deseja mesmo excluir este contato?')) {
      await api.deleteContact(id);
      router.push('/');
    }
  };

  useEffect(() => {
    const getContact = async () => {
      const data = (await api.fetchContact(id)) as Entry;
      if (Object.keys(data).length) {
        setContact(data);
      }
    };

    getContact();
  }, [id]);

  return (
    <Container>
      <Header heading="Detalhes do contato" navLinks={[['/', 'Voltar']]} />
      {contact && (
        <Form
          ariaLabel="form"
          initialValues={{
            name: contact.name,
            email: contact.email,
            phoneNumber: contact.phoneNumber,
          }}
          handleSubmit={handleSubmit}
          disabled={!editing}
        />
      )}
      <div>
        <MainButton type="button" onClick={() => setEditing((prev) => !prev)}>
          {editing ? 'Cancelar' : 'Editar'}
        </MainButton>
        <MainButton type="button" onClick={deleteContact}>
          Apagar
        </MainButton>
      </div>
    </Container>
  );
}
