'use client'

import ButtonAppBar from '../pages/header/header'
import OptikonFooter from '../pages/footer/footer'

export default function MuiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ButtonAppBar />
      {children}
      <OptikonFooter />
    </>
  );
}
