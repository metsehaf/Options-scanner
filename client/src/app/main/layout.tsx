// app/main/layout.tsx
'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import Aside from '../../components/aside-element/aside';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <UserProvider>
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Aside />
      <main style={{ flexGrow: 1, background: "#F9FAFB" }}>
        {children}
      </main>
    </div>
  </UserProvider>;
}
