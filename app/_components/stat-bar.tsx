type StatBarProps = {
    name: string
    stat: number
    statMax: number
    color: string
}

export default function StatBar({ name, stat, statMax, color }: StatBarProps) {
    return (
        <>
            <h2 className="mb-1">{name}</h2>
            <div className="relative h-6 rounded-full bg-neutral-300 pr-3 text-sm text-neutral-900">
                <div
                    style={{
                        width: `${(stat * 100) / statMax}%`,
                    }}
                    className={`absolute inset-0 rounded-full ${color}`}
                />
                <span className="absolute inset-0 z-10 flex w-full items-center justify-center">
                    {stat} / {statMax}
                </span>
            </div>
        </>
    )
}
