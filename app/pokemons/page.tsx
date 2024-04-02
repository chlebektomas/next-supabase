import Filters from '@/components/filters'
import { Suspense } from 'react'
import PokemonList from './pokemon-list'
import { createClient } from '@/utils/supabase/server'
import PokemonListSkeleton from './pokemon-list-skeleton'

interface PageProps {
    searchParams: {
        [key: string]: string | undefined
    }
}

export default async function Page({ searchParams }: PageProps) {
    const supabase = createClient()

    let query = supabase.from('types').select()
    const { data: types } = await query

    const search = searchParams['search'] ?? ''
    const type = searchParams['type'] ?? ''
    const currentPage = searchParams['page'] ?? '1'
    const loadMore = !!searchParams['loadMore'] ?? 'false'

    const keyString = `search=${searchParams['search']}&type=${searchParams['type']}` // for triggering suspense after filter change

    return (
        <div className="mx-auto my-10 w-full max-w-6xl flex-1">
            <Filters types={types} />
            <Suspense key={keyString} fallback={<PokemonListSkeleton />}>
                <PokemonList
                    search={search}
                    type={type}
                    currentPage={Number(currentPage)}
                    loadMore={loadMore}
                />
            </Suspense>
        </div>
    )
}
