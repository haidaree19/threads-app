import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'

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
                        <main className='flex w-full flex-row flex-grow gap-8'>
                            <LeftSidebar />
                            <section className="main-container">
                                <div className="w-full max-w-4xl">
                                    {children}
                                </div>
                            </section>
                            <RightSidebar />
                        </main>
                        <Bottombar />
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}
