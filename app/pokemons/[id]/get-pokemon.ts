import { createClient } from '@/_lib/supabase/server'

export async function getPokemon(id: string) {
    try {
        const supabase = createClient()

        const { data: pokemons } = await supabase
            .from('pokemon')
            .select()
            .eq('id', id)

        const pokemon = pokemons ? pokemons[0] : null

        return pokemon
    } catch (error) {
        throw new Error('Error fetching pokemon')
    }
}
