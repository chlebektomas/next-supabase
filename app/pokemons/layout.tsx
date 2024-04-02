import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

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
