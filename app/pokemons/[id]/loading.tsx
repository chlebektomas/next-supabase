import { Skeleton } from '@/_components/ui/skeleton'

export default function Loading() {
    return (
        <div className="mx-auto my-10 h-full w-full max-w-sm flex-1 p-6">
            <div className="flex flex-col items-center justify-center gap-5">
                <Skeleton className="size-80 rounded-full" />

                <Skeleton className="h-10 w-1/2 rounded-md" />

                <div className="flex w-full justify-around">
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
            </div>
        </div>
    )
}
