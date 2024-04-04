import Link from 'next/link'
import { SubmitButton } from './submit-button'
import { Button } from '@/_components/ui/button'
import { signIn, signUp } from '@/_lib/actions'

export default function Signin({
    searchParams,
}: {
    searchParams: { message: string }
}) {
    return (
        <div className="flex min-h-screen w-full max-w-md flex-col justify-center gap-2 px-8 opacity-0 animate-in">
            <form className="mx-auto flex w-full max-w-md  flex-col gap-2">
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="mb-6 rounded-md border bg-inherit px-4 py-2"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="mb-6 rounded-md border bg-inherit px-4 py-2"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <SubmitButton
                    formAction={signIn}
                    className="mb-2"
                    pendingText="Signing In..."
                >
                    Sign In
                </SubmitButton>
                <SubmitButton
                    formAction={signUp}
                    className=""
                    pendingText="Signing Up..."
                    variant="secondary"
                >
                    Sign Up
                </SubmitButton>
                {searchParams?.message && (
                    <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                        {searchParams.message}
                    </p>
                )}
            </form>
            <Button variant="link" asChild>
                <Link href="/pokemons">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1 size-4"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back
                </Link>
            </Button>
        </div>
    )
}
