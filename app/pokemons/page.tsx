import PokemonListSection from '@/_components/pokemon-list-section'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default async function Page({ searchParams }: PageProps) {
    return <PokemonListSection searchParams={searchParams} />
}
