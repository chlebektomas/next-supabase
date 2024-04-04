'use client'

import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { addToFavorites, removeFromFavorites } from '@/_lib/actions'
import { Button } from '@/_components/ui/button'
import { useToast } from '@/_components/ui/use-toast'
import { useOptimistic, useTransition } from 'react'
import Link from '@/_components/ui/link'

interface FavoriteButtonProps {
    userId: string | null
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

    const handleChangeFavorite = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        if (!userId) {
            return toast({
                key: Math.random(),
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

        if (optimisticFavorite) {
            toast({
                key: Math.random(),
                variant: 'success',
                duration: 3000,
                description: 'Pokemon removed from favorites.',
            })

            await removeFromFavorites(userId, pokemonId)
        } else {
            toast({
                key: Math.random(),
                variant: 'success',
                duration: 3000,
                description: 'Pokemon add to favorites.',
            })

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
