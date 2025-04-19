'use client'

import ButtonAppBar from './header/header'
import OptikonFooter from './footer/footer'
import React from 'react';
import { usePathname } from 'next/navigation';

export default function MuiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide layout for dashboard (or any routes you want)
  const hideLayout = pathname.startsWith('/main/dashboard');

  if (hideLayout) {
    return <>{children}</>;
  }
  return (
    <>
      <ButtonAppBar />
      {children}
      <OptikonFooter />
    </>
  );
}
