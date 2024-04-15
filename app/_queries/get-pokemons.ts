import { createClient } from '@/_lib/supabase/server'
import { getUser } from '@/_queries/get-user'

export async function getPokemons(
    itemsPerPage: number,
    currentPage: number,
    search: string | string[],
    type: string | string[],
    loadMore: boolean,
    favoritesPage: boolean
) {
    const supabase = createClient()

    const user = await getUser()
    const userId = user?.id || ''

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage - 1

    let query = supabase
        .from('pokemon')
        .select('id, name, type, image_url', { count: 'exact' })

    if (favoritesPage && userId) {
        const { data: favorites } = await supabase
            .from('favorites')
            .select()
            .eq('user_id', userId)

        if (favorites) {
            query = query.in(
                'id',
                favorites.map((favorite) => favorite.pokemon_id)
            )
        }
    }

    if (search) {
        query = query.ilike('name', `%${search}%`)
    }

    if (type) {
        query = query.contains('type', [type])
    }

    const { data: pokemons, count } = await query.range(
        loadMore ? 0 : start,
        end
    )

    return { pokemons, count }
}
