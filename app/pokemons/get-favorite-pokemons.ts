import { createClient } from '@/_lib/supabase/server'

export async function getFavoritePokemons(id: string | null = null) {
    try {
        const supabase = createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) return { favorites: [], userId: null }

        const userId = user.id

        let query = supabase.from('favorites').select().eq('user_id', userId)

        if (id) {
            query = query.eq('pokemon_id', id)
        }

        const { data: favorites } = await query

        return { favorites, userId }
    } catch (error) {
        throw new Error('Error fetching favorites')
    }
}
