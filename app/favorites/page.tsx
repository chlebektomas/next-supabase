import { createClient } from '@/_lib/supabase/server'
import { redirect } from 'next/navigation'
import PokemonListSection from '@/_components/pokemon-list-section'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default async function Page({ searchParams }: PageProps) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/signin')
    }

    return (
        <PokemonListSection searchParams={searchParams} favoritesPage={true} />
    )
}
