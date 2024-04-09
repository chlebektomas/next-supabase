import { createClient } from '@/_lib/supabase/server'

export async function getPokemons(
    itemsPerPage: number,
    currentPage: number,
    search: string | string[],
    type: string | string[],
    loadMore: boolean,
    favoritesPage: boolean
) {
    try {
        const supabase = createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

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
    } catch (error) {
        throw new Error('Error fetching pokemons')
    }
}
