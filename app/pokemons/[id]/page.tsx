import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface PageProps {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageProps) {
    const { id } = params
    const supabase = createClient()
    const { data: pokemons } = await supabase
        .from('pokemon')
        .select()
        .eq('id', id)

    if (!pokemons?.length) notFound()

    const pokemon = pokemons[0]

    return (
        <main className="mx-auto h-full max-w-6xl flex-1 p-6">
            <h1 className="">{pokemon.name}</h1>
        </main>
    )
}
