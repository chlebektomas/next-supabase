import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navigation from '@/components/navigation'

export default async function ProtectedPage() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

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
