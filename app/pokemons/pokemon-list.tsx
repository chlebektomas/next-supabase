import Image from 'next/image'
import Link from 'next/link'
import PaginationSection from '@/_components/pagination-section'
import FavoriteButton from '@/_components/favorite-button'
import { getPokemons } from '@/pokemons/get-pokemons'
import { getFavoritePokemons } from '@/pokemons/get-favorite-pokemons'

type PokemonListProps = {
    search: string | string[]
    type: string | string[]
    currentPage: number
    loadMore: boolean
}

export default async function PokemonList({
    search,
    type,
    currentPage,
    loadMore,
}: PokemonListProps) {
    const itemsPerPage = 12

    const pokemonsPromise = getPokemons(
        itemsPerPage,
        currentPage,
        search,
        type,
        loadMore
    )
    const favoritesPromise = getFavoritePokemons()

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
                                    userId={userId}
                                    pokemonId={pokemon.id}
                                    isFavorite={isFavorite}
                                />
                            </h2>

                            <p className="text-neutral-400">
                                {pokemon.type.join(', ')}
                            </p>
                        </Link>
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
