import { createClient } from '@/_lib/supabase/server'
import { getUser } from '@/_queries/get-user'

export async function getPokemon(id: string) {
    const supabase = createClient()

    const user = await getUser()
    const userId = user?.id || ''

    const { data: pokemon } = await supabase
        .from('pokemon')
        .select()
        .eq('id', id)
        .single()

    const { data: favorite } = await supabase
        .from('favorites')
        .select()
        .eq('user_id', userId)
        .eq('pokemon_id', id)
        .single()

    const isFavorite = !!favorite

    return { pokemon, isFavorite, userId }
}
