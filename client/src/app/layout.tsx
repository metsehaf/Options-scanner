
import type { Metadata } from 'next'
import MuiLayout from './MuiLayout'
import '../scss/App.scss'; 

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
      <MuiLayout>{children}</MuiLayout> {/* Wrap content inside Client Component */}
      </body>
    </html>
  )
}