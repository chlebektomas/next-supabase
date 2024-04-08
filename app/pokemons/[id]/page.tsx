import { getPokemon } from '@/pokemons/[id]/get-pokemon'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import StatBar from '@/_components/stat-bar'
import FavoriteButton from '@/_components/favorite-button'
import ShareButton from '@/_components/share-button'
import Evolutions from './evolutions'

interface PageProps {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageProps) {
    const { id } = params

    const { pokemon, isFavorite, userId } = await getPokemon(id)

    if (!pokemon) notFound()

    return (
        <main className="mx-auto my-10 h-full max-w-sm flex-1 p-6">
            <div className="relative size-80 overflow-hidden rounded-full bg-white">
                <Image
                    src={pokemon.image_url}
                    alt={pokemon.name}
                    fill
                    className="object-contain p-10"
                />
            </div>

            <div className="mt-5 space-y-2 text-center">
                <h1 className="text-4xl">{pokemon.name}</h1>

                <p className="text-lg text-neutral-400">
                    {pokemon.type.join(', ')}
                </p>

                <div className="flex justify-center gap-1">
                    <FavoriteButton
                        userId={userId}
                        pokemonId={pokemon.id}
                        isFavorite={isFavorite}
                    />
                    <ShareButton />
                </div>
            </div>

            <div className="my-3 flex justify-around text-center">
                <div>
                    <h2>Height</h2>
                    <p className="text-neutral-400">{pokemon.height} m</p>
                </div>

                <div>
                    <h2>Weight</h2>
                    <p className="text-neutral-400">{pokemon.weight} kg</p>
                </div>
            </div>

            <ul className="space-y-3 text-center">
                <li>
                    <StatBar
                        name="HP"
                        stat={pokemon.base_stat_hp}
                        statMax={pokemon.level_100_max_hp}
                        color="bg-red-400"
                    />
                </li>

                <li>
                    <StatBar
                        name="Attack"
                        stat={pokemon.base_stat_attack}
                        statMax={pokemon.level_100_max_attack}
                        color="bg-red-600"
                    />
                </li>

                <li>
                    <StatBar
                        name="Defense"
                        stat={pokemon.base_stat_defense}
                        statMax={pokemon.level_100_max_defense}
                        color="bg-blue-600"
                    />
                </li>

                <li>
                    <StatBar
                        name="Speed"
                        stat={pokemon.base_stat_speed}
                        statMax={pokemon.level_100_max_speed}
                        color="bg-green-600"
                    />
                </li>

                <li>
                    <StatBar
                        name="Special"
                        stat={pokemon.base_stat_special}
                        statMax={pokemon.level_100_max_special}
                        color="bg-yellow-600"
                    />
                </li>
            </ul>

            <legend className="mt-3 flex gap-1 text-xs font-light text-neutral-400">
                <span>*</span>
                The stats are calculated based on the level 100 max stats
            </legend>

            <Evolutions evolutionsIds={pokemon.evolutions} />
        </main>
    )
}
