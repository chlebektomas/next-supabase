import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'

export default async function AuthButton() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'

        const supabase = createClient()
        await supabase.auth.signOut()

        return redirect('/')
    }

    return user ? (
        <>
            <Button variant="link" asChild>
                <Link href="/account">Account</Link>
            </Button>
            <form action={signOut}>
                <Button variant="link" type="submit">
                    Logout
                </Button>
            </form>
        </>
    ) : (
        <Button asChild>
            <Link href="/signin">Sign in</Link>
        </Button>
    )
}
