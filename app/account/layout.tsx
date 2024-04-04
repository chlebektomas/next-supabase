import Navigation from '@/_components/navigation'

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navigation />
            {children}
        </>
    )
}
