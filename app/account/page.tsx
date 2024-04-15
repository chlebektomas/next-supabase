import { getUser } from '@/_queries/get-user'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
    const user = await getUser()

    if (!user) {
        return redirect('/signin')
    }

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center p-6 text-center opacity-0 animate-in">
            <h1 className="mb-4 text-4xl font-bold">
                You are authenticated as
            </h1>
            <p>{user?.email}</p>
        </div>
    )
}
