import { createClient } from '@/_lib/supabase/server'

let types:
    | {
          name: string
      }[]
    | null

export async function getTypes() {
    if (!types) {
        const supabase = createClient()

        const { data: pokemonTypes } = await supabase.from('types').select()

        types = pokemonTypes
    }

    return types
}
