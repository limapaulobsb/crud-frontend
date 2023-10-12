import styled from 'styled-components';

export const Button = styled.button`
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
`;

export const MainButton = styled(Button)`
  border: 1px solid black;
  height: 40px;
  text-transform: uppercase;
  width: 100px;
`;
