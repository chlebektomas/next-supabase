import { Suspense } from 'react'
import Filters from '@/_components/filters'
import PokemonList from '@/pokemons/pokemon-list'
import PokemonListSkeleton from '@/pokemons/pokemon-list-skeleton'
import { getPokemonTypes } from '@/pokemons/get-pokemon-types'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default async function Page({ searchParams }: PageProps) {
    const types = await getPokemonTypes()
    const keyString = `search=${searchParams['search']}&type=${searchParams['type']}` // for triggering suspense after filter change

    const search = searchParams['search'] ?? ''
    const type = searchParams['type'] ?? ''
    const currentPage = Number(searchParams['page'] ?? '1')
    const loadMore = !!searchParams['loadMore']

    return (
        <main className="mx-auto my-10 w-full max-w-6xl flex-1">
            <Filters types={types} />

            <Suspense key={keyString} fallback={<PokemonListSkeleton />}>
                <PokemonList
                    search={search}
                    type={type}
                    currentPage={currentPage}
                    loadMore={loadMore}
                />
            </Suspense>
        </main>
    )
}
