import PokemonCard from '@/_components/pokemon-card'
import { getEvolution } from '@/pokemons/[id]/get-evolution'

type EvolutionProps = {
    evolutionsIds: string[] | null
}

export default async function Evolutions({ evolutionsIds }: EvolutionProps) {
    if (!evolutionsIds) return null

    const evolutions = await Promise.all(
        evolutionsIds.map(async (id) => {
            const { pokemon, isFavorite, userId } = await getEvolution(id)
            return { pokemon, isFavorite, userId }
        })
    )

    return (
        <>
            <h3 className="mb-3 mt-5 text-center">Evolutions </h3>
            <div className="grid grid-cols-1 gap-1 opacity-0 animate-in">
                {evolutions?.map(({ pokemon, isFavorite, userId }) => {
                    if (!pokemon) return null

                    return (
                        <PokemonCard
                            key={pokemon!.id}
                            pokemon={pokemon}
                            isFavorite={isFavorite}
                            userId={userId}
                        />
                    )
                })}
            </div>
        </>
    )
}
