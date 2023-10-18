import styled from 'styled-components';

export const Button = styled.button`
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
  border: 1px solid black;
  height: 40px;
  text-transform: uppercase;
  width: 100px;
`;
