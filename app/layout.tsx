import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { twMerge } from 'tailwind-merge'
import { Toaster } from '@/_components/ui/toaster'

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Next.js and Supabase Starter Kit',
    description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={twMerge(GeistSans.className, 'dark')}>
            <body>
                <main className="flex min-h-screen flex-col items-center">
                    {children}
                </main>
                <Toaster />
            </body>
        </html>
    )
}
