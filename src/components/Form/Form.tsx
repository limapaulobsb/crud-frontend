'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { MainButton, MainInput } from '@/components/styled';
import type { FormProps } from '@/types';

export default function Form({ handleSubmit, initialValues, disabled }: FormProps) {
  const [inputValues, setInputValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event, inputValues)}
    >
      <label>
        <span>Nome:</span>
        <MainInput
          name="name"
          placeholder="Digite um nome..."
          value={inputValues.name}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label>
        <span>E-mail:</span>
        <MainInput
          name="email"
          placeholder="Digite um e-mail..."
          value={inputValues.email}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label>
        <span>Telefone:</span>
        <MainInput
          name="phoneNumber"
          placeholder="Digite um telefone..."
          value={inputValues.phoneNumber}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      {!disabled && (
        <MainButton
          type="submit"
          disabled={!inputValues.name || (!inputValues.email && !inputValues.phoneNumber)}
        >
          Salvar
        </MainButton>
      )}
    </form>
  );
}
