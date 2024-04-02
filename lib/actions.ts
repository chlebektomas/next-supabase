'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addToFavorites(userId: string, pokemonId: string) {
    const supabase = createClient()

    await supabase
        .from('favorites')
        .insert({ user_id: userId, pokemon_id: pokemonId })
        .select()

    revalidatePath('/pokemons')
}

export async function removeFromFavorites(userId: string, pokemonId: string) {
    const supabase = createClient()

    await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('pokemon_id', pokemonId)

    revalidatePath('/pokemons')
}
