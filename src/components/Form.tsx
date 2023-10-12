'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';

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
        <input
          name="name"
          value={inputValues.name}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label>
        <span>E-mail:</span>
        <input
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      <label>
        <span>Telefone:</span>
        <input
          name="phoneNumber"
          value={inputValues.phoneNumber}
          onChange={handleChange}
          disabled={disabled}
        />
      </label>
      {!disabled && <button type="submit">Salvar</button>}
    </form>
  );
}
