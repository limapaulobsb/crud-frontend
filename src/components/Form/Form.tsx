'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

import { MainButton, MainInput } from '../styled';
import type { FormProps } from '@/types';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  & > div {
    height: 40px;
    text-align: right;
  }
`;

export default function Form({
  ariaLabel,
  initialValues,
  handleSubmit,
  disabled,
}: FormProps) {
  const [inputValues, setInputValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <Container
      aria-label={ariaLabel}
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
      <div>
        {!disabled && (
          <MainButton
            type="submit"
            disabled={
              !inputValues.name || (!inputValues.email && !inputValues.phoneNumber)
            }
          >
            Salvar
          </MainButton>
        )}
      </div>
    </Container>
  );
}
