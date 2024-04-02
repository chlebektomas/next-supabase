'use client'

import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { addToFavorites, removeFromFavorites } from '../lib/actions'
import { Button } from './ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useOptimistic } from 'react'
import Link from './ui/link'

interface FavoriteButtonProps {
    userId: string | undefined
    pokemonId: string
    isFavorite: boolean
}

export default function FavoriteButton({
    userId,
    pokemonId,
    isFavorite,
}: FavoriteButtonProps) {
    const { toast } = useToast()
    const [optimisticFavorite, changeOptimisticFavorite] = useOptimistic(
        isFavorite, // original value
        (state) => !state // new value
    )

    const handleChangeFavorite = async (e: any) => {
        e.preventDefault()

        if (!userId) {
            return toast({
                variant: 'destructive',
                duration: 5000,
                description: (
                    <>
                        Favorites are only for registred users. Please,{' '}
                        <Link href="/signin">sign in</Link>.
                    </>
                ),
            })
        }

        changeOptimisticFavorite(!isFavorite)

        if (isFavorite) {
            await removeFromFavorites(userId, pokemonId)
        } else {
            await addToFavorites(userId, pokemonId)
        }
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleChangeFavorite}>
            {optimisticFavorite && <HeartIcon className="size-6" />}
            {!optimisticFavorite && <HeartOutlineIcon className="size-6" />}
        </Button>
    )
}
