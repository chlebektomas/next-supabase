import PaginationSection from '@/_components/pagination-section'
import { getPokemons } from '@/_queries/get-pokemons'
import { getFavorites } from '@/_queries/get-favorites'
import PokemonCard from './pokemon-card'

type PokemonListProps = {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
    favoritesPage: boolean
}

export default async function PokemonList({
    searchParams,
    favoritesPage,
}: PokemonListProps) {
    const itemsPerPage = 12
    const search = searchParams['search'] ?? ''
    const type = searchParams['type'] ?? ''
    const currentPage = Number(searchParams['page'] ?? '1')
    const loadMore = !!searchParams['loadMore']

    const pokemonsPromise = getPokemons(
        itemsPerPage,
        currentPage,
        search,
        type,
        loadMore,
        favoritesPage
    )
    const favoritesPromise = getFavorites()

    const [{ pokemons, count }, { favorites, userId }] = await Promise.all([
        pokemonsPromise,
        favoritesPromise,
    ])

    if (!pokemons || pokemons.length === 0) {
        return (
            <div className="mt-10 flex w-full items-center justify-center">
                <h2 className="text-2xl font-light text-white opacity-75">
                    No Pokemons found
                </h2>
            </div>
        )
    }

    return (
        <>
            <div className="grid max-w-6xl gap-1 p-3 opacity-0 animate-in min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pokemons.map((pokemon) => {
                    const isFavorite = !!favorites?.some(
                        (favorite) => favorite.pokemon_id === pokemon.id
                    )

                    return (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            isFavorite={isFavorite}
                            userId={userId}
                        />
                    )
                })}
            </div>

            <PaginationSection
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                count={count ?? 0}
            />
        </>
    )
}
