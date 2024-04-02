'use client'

import { Input } from './ui/input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

type FiltersProps = {
    types: { name: string }[] | null
}

export default function Filters({ types }: FiltersProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }

        replace(`${pathname}?${params.toString()}`)
    }, 300)

    const handleType = (value: string) => {
        const params = new URLSearchParams(searchParams)

        console.log('🔥 value: ', value)

        if (value && value !== 'type') {
            params.delete('type')
            params.set('type', value)
        } else {
            params.delete('type')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex gap-5 px-6">
            <Input
                type="search"
                placeholder="Search"
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
                defaultValue={searchParams.get('search')?.toString()}
                className="flex-1"
            />
            <Select onValueChange={(e) => handleType(e)} defaultValue="type">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="type">Type</SelectItem>
                    {types?.map(({ name }) => (
                        <SelectItem key={name} value={name}>
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
