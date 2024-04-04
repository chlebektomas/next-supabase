import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { getUser } from '@/auth/get-user'
import { signOut } from '@/_lib/actions'

export default async function AuthButton() {
    const user = await getUser()

    return user ? (
        <>
            <Button variant="link" asChild>
                <Link href="/account">Account</Link>
            </Button>
            <form action={signOut}>
                <Button variant="link" type="submit">
                    <ArrowRightEndOnRectangleIcon className="size-6" />
                </Button>
            </form>
        </>
    ) : (
        <Button asChild>
            <Link href="/signin">Sign in</Link>
        </Button>
    )
}
