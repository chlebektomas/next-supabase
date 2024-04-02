import { Skeleton } from '@/components/ui/skeleton'

export default async function PokemonListSkeleton() {
    return (
        <div className="grid max-w-6xl gap-5 p-6 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col lg:flex-1">
                    <Skeleton className="aspect-square w-full overflow-hidden rounded-xl" />
                </div>
            ))}
        </div>
    )
}
