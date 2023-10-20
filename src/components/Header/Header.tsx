import Link from 'next/link';
import styled from 'styled-components';

import type { HeaderProps } from '@/types';

const Container = styled.header`
  & > h1 {
    font-size: 3rem;
    margin-bottom: 40px;
  }

  & > nav {
    display: flex;
    gap: 10px;
    justify-content: center;

    & > a {
      color: rgb(30 30 30);
      background-color: white;
      border-radius: 30px;
      padding: 10px 20px;
    }
  }
`;

export default function Header({ heading, navLinks }: HeaderProps) {
  return (
    <Container>
      <h1>{heading}</h1>
      <nav>
        {navLinks?.map(([route, text], index) => (
          <Link key={index} href={route}>
            {text}
          </Link>
        ))}
      </nav>
    </Container>
  );
}
