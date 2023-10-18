'use client';
import React from 'react';
import Link from 'next/link';

import type { HeaderProps } from '@/types';

export default function Header({ heading, navLinks }: HeaderProps) {
  return (
    <header>
      <h1>{heading}</h1>
      <nav>
        {navLinks?.map(([route, text], index) => (
          <Link key={index} href={route}>
            {text}
          </Link>
        ))}
      </nav>
    </header>
  );
}
