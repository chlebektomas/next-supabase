import React from 'react'
import Link from 'next/link'
import AuthButton from './auth-button'
import { Button } from './ui/button'

export default function Navigation() {
    return (
        <nav className="flex w-full justify-center border-b border-b-foreground/10">
            <div className="flex w-full max-w-6xl items-center justify-between p-3 text-sm">
                <Button variant="link" asChild>
                    <Link href="/">Home</Link>
                </Button>
                <div className="flex">
                    <Button variant="link" asChild>
                        <Link href="/pokemons">Pokemons</Link>
                    </Button>
                    <AuthButton />
                </div>
            </div>
        </nav>
    )
}
