'use client'

import { ShareIcon } from '@heroicons/react/24/outline'
import { Button } from '@/_components/ui/button'
import { useToast } from '@/_components/ui/use-toast'

export default function ShareButton() {
    const { toast } = useToast()

    const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            await navigator.clipboard.writeText(window.location.href)

            toast({
                duration: 3000,
                variant: 'success',
                description: 'Link copied to the clipboard.',
            })
        } catch (error) {
            console.error(error)

            toast({
                duration: 3000,
                variant: 'destructive',
                description: 'Failed to copy the link to the clipboard.',
            })
        }
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleShare}>
            <ShareIcon className="size-6" />
        </Button>
    )
}
