import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Topbar from '@/components/shared/Bottombar'
import Bottombar from '@/components/shared/Topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Flowww',
    description: 'A new social media app'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className}`}>
                    <div className='w-full flex min-h-screen flex-col justify-between'>
                        <Topbar />
                        <main className='w-full flex-grow-1'>
                            <h1>Auth</h1>
                            {children}
                        </main>
                        <Bottombar />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}