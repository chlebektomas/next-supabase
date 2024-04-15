import { Suspense } from 'react'
import Filters from '@/_components/filters'
import PokemonList from '@/_components/pokemon-list'
import PokemonListSkeleton from '@/_components/pokemon-list-skeleton'
import { getTypes } from '@/_queries/get-types'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
    favoritesPage?: boolean
}

export default async function PokemonListSection({
    searchParams,
    favoritesPage = false,
}: PageProps) {
    const types = await getTypes()
    const keyString = `search=${searchParams['search']}&type=${searchParams['type']}` // for triggering suspense after filter change

    return (
        <main className="mx-auto my-10 w-full max-w-6xl flex-1">
            <h1 className="mb-10 text-center text-3xl font-bold">
                {favoritesPage ? 'Favorites' : 'Pokemons'}
            </h1>

            <Filters types={types} />

            <Suspense key={keyString} fallback={<PokemonListSkeleton />}>
                <PokemonList
                    searchParams={searchParams}
                    favoritesPage={favoritesPage}
                />
            </Suspense>
        </main>
    )
}
