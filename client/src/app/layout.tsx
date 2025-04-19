
import type { Metadata } from 'next'
import MuiLayout from './MuiLayout'
import '../scss/App.scss';

import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
 // Adjust the path based on your project structure

export const metadata: Metadata = {
  title: 'Bullx',
  description: 'Option trading platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <UserProvider>
          <MuiLayout>{children}</MuiLayout> {/* Wrap content inside Client Component */}
        </UserProvider>
      </body>
    </html>
  )
}