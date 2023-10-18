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
    <form onSubmit={(event: FormEvent) => handleSubmit(event, inputValues)}>
      <label>
        <span>Nome:</span>
        <MainInput
          name="name"
          value={inputValues.name}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label>
        <span>E-mail:</span>
        <MainInput
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label>
        <span>Telefone:</span>
        <MainInput
          name="phoneNumber"
          value={inputValues.phoneNumber}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      {!disabled && <MainButton type="submit">Salvar</MainButton>}
    </form>
  );
}
