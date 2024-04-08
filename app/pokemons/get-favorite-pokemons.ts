import { createClient } from '@/_lib/supabase/server'

export async function getFavoritePokemons() {
    try {
        const supabase = createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) return { favorites: [], userId: null }

        const userId = user.id

        const { data: favorites } = await supabase
            .from('favorites')
            .select()
            .eq('user_id', userId)

        return { favorites, userId }
    } catch (error) {
        throw new Error('Error fetching favorites')
    }
}
