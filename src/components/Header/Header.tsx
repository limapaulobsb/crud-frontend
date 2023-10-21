import Link from 'next/link';
import styled from 'styled-components';

import type { HeaderProps } from '@/types';

const Container = styled.header`
  & > h1 {
    font-size: 3rem;
    margin-bottom: 40px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 10px;
  justify-content: center;

  & > a {
    background-color: white;
    border-radius: 30px;
    color: rgb(30 30 30);
    padding: 10px 20px;
  }
`;

export default function Header({ heading, navLinks }: HeaderProps) {
  return (
    <Container>
      <h1>{heading}</h1>
      <Navigation>
        {navLinks?.map(([route, text], index) => (
          <Link key={index} href={route}>
            {text}
          </Link>
        ))}
      </Navigation>
    </Container>
  );
}
