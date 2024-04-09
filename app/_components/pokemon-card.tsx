import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '@/_components/favorite-button'
import { Tables } from '@/_lib/database.types'

type PokemonCardType = Pick<
    Tables<'pokemon'>,
    'id' | 'name' | 'type' | 'image_url'
>

type PokemonCardProps = {
    pokemon: PokemonCardType
    userId: string | null
    isFavorite: boolean
}

export default function PokemonCard({
    pokemon,
    userId,
    isFavorite,
}: PokemonCardProps) {
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

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="mt-2 flex justify-between overflow-hidden overflow-ellipsis whitespace-nowrap text-white first-letter:uppercase lg:text-lg">
                        {pokemon.name}
                    </h2>

                    <p className="text-neutral-400">
                        {pokemon.type.join(', ')}
                    </p>
                </div>
                <FavoriteButton
                    userId={userId}
                    pokemonId={pokemon.id}
                    isFavorite={isFavorite}
                />
            </div>
        </Link>
    )
}
