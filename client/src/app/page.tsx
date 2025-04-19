'use client'; // 👈 Tells Next.js this is a Client Component
// pages/index.tsx
import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';
import LandingPage from './landing/page';
import Dashboard from './main/dashboard/page'; // Adjust the path as needed

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {user ? (
        <Dashboard /> // Render the main layout if the user is authenticated
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
