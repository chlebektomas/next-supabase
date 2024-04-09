import Navigation from '@/_components/navigation'
import Footer from '@/_components/footer'

export default async function ContentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    )
}
