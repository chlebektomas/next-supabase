import NextLogo from '@/components/next-logo'
import SupabaseLogo from '@/components/supabase-logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Index() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <p className="mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
                Pokedex clone created with{' '}
                <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    Supabase
                </a>{' '}
                and{' '}
                <a
                    href="https://nextjs.org/"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                >
                    Next.js
                </a>
            </p>
            <div className="flex items-center justify-center gap-8">
                <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    rel="noreferrer"
                >
                    <SupabaseLogo />
                </a>
                <span className="h-6 rotate-45 border-l border-white" />
                <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                    <NextLogo />
                </a>
            </div>
            <div className="my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />
            <Button asChild>
                <Link href="/pokemons">Let`s go!</Link>
            </Button>
        </div>
    )
}
