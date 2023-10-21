import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:disabled {
    cursor: unset;
    opacity: 0.4;
  }
`;

export const MainButton = styled(Button)`
  background-color: black;
  height: 40px;
  text-transform: uppercase;
  width: 120px;
`;
