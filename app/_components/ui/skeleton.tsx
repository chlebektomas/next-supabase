import { cn } from '@/_lib/utils'

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-neutral-700', className)}
            {...props}
        />
    )
}

export { Skeleton }
