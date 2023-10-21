import styled from 'styled-components';

export const Input = styled.input`
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
`;

export const MainInput = styled(Input)`
  background-color: rgb(90 90 90);
  border: 1px solid rgb(120 120 120);
  color: white;
  font-size: 1.2rem;
  height: 40px;
  padding: 0 5px;
  width: 300px;

  &::placeholder {
    color: rgb(180 180 180);
  }

  &:disabled {
    background-color: transparent;
    border: none;
    padding: 0;
  }
`;
