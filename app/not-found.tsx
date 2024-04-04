import Link from 'next/link'
import { Button } from '@/_components/ui/button'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
    return (
        <main className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
            <div className="text-center">
                <MagnifyingGlassIcon className="h-20 w-full" />
                <h1 className="text-gradient mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-6 text-base leading-7 text-neutral-400">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex justify-center">
                    <Button asChild>
                        <Link href="/">Go home</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}
