import { createClient } from '@/_lib/supabase/server'

export async function getPokemons(
    itemsPerPage: number,
    currentPage: number,
    search: string | string[],
    type: string | string[],
    loadMore: boolean
) {
    try {
        const supabase = createClient()

        const start = (currentPage - 1) * itemsPerPage
        const end = start + itemsPerPage - 1

        let query = supabase
            .from('pokemon')
            .select('id, name, type, image_url', { count: 'exact' })

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
