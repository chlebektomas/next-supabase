import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import PaginationSection from '@/components/pagination-section'

import FavoriteButton from '@/components/favorite-button'

type PokemonListProps = {
    search: string
    type: string
    currentPage: number
    loadMore: boolean
}

export default async function PokemonList({
    search,
    type,
    currentPage,
    loadMore,
}: PokemonListProps) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    let query = supabase.from('pokemon').select('*', { count: 'exact' })

    if (search) {
        query = query.ilike('name', `%${search}%`)
    }

    if (type) {
        query = query.contains('type', [type])
    }

    const itemsPerPage = 12
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage - 1

    const { data: pokemons, count } = await query.range(
        loadMore ? 0 : start,
        end
    )

    const lastPage = Math.ceil(count! / 12)

    const { data: favoritesData } = await supabase
        .from('favorites')
        .select()
        .eq('user_id', user?.id)

    return (
        <>
            <div className="grid max-w-6xl gap-1 p-3 opacity-0 animate-in min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {!pokemons?.length ? (
                    <div className="flex h-96 w-full items-center justify-center">
                        <h2 className="text-2xl font-light text-white opacity-75">
                            No Pokemons found
                        </h2>
                    </div>
                ) : (
                    pokemons?.map((pokemon) => {
                        const isFavorite =
                            favoritesData?.some(
                                (favorite) => favorite.pokemon_id === pokemon.id
                            ) || false

                        return (
                            <Link
                                key={pokemon.id}
                                href={`/pokemons/${pokemon.id}`}
                                className="group w-full overflow-hidden rounded-3xl from-neutral-700 from-10% to-neutral-800 p-3 transition-all duration-300 hover:cursor-pointer hover:bg-gradient-to-tr"
                            >
                                <div className="hover:group relative aspect-square rounded-xl bg-white">
                                    <Image
                                        src={pokemon.image_url}
                                        alt={pokemon.name}
                                        className="p-10 transition-all duration-300 group-hover:scale-110"
                                        sizes="(min-width: 768px) 25vw, 50vw"
                                        fill
                                        priority
                                    />
                                </div>
                                <h2 className="mt-2 flex justify-between overflow-hidden overflow-ellipsis whitespace-nowrap text-white first-letter:uppercase lg:text-lg">
                                    {pokemon.name}
                                    <FavoriteButton
                                        userId={user?.id}
                                        pokemonId={pokemon.id}
                                        isFavorite={isFavorite}
                                    />
                                </h2>
                                <p className="text-neutral-400">
                                    {pokemon.type.join(', ')}
                                </p>
                            </Link>
                        )
                    })
                )}
            </div>
            {pokemons?.length && pokemons.length > 1 ? (
                <PaginationSection
                    currentPage={currentPage}
                    lastPage={lastPage}
                />
            ) : null}
        </>
    )
}
