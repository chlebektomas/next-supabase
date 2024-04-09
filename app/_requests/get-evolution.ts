import { createClient } from '@/_lib/supabase/server'

export async function getEvolution(id: string) {
    try {
        const supabase = createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        const userId = user?.id || ''

        const { data: pokemon } = await supabase
            .from('pokemon')
            .select('id, name, type, image_url')
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
    } catch (error) {
        throw new Error('Error fetching pokemon')
    }
}
