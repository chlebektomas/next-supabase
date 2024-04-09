import { Tables } from '@/_lib/database.types'

export type PokemonCardType = Pick<
    Tables<'pokemon'>,
    'id' | 'name' | 'type' | 'image_url'
>
