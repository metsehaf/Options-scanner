// app/main/layout.tsx
'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import Aside from '@components/aside-element/aside';
import Header from '@components/dashboard-header/header';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <UserProvider>
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Aside />
      <div style={{ display: "block", position: 'relative', width: "100%" }}>
        <Header />
        <main style={{ flexGrow: 1, background: "#F9FAFB" }}>
          {children}
        </main>
      </div>

    </div>
  </UserProvider>;
}
