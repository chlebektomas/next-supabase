import { createClient } from '@/_lib/supabase/server'
import { getUser } from '@/_queries/get-user'

export async function getFavorites() {
    try {
        const supabase = createClient()

        const user = await getUser()

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
