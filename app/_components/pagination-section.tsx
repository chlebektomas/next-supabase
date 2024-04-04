'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/_components/ui/pagination'
import { Button } from './ui/button'

type PaginationProps = {
    itemsPerPage: number
    currentPage: number
    count: number
}

export default function PaginationSection({
    itemsPerPage,
    currentPage,
    count,
}: PaginationProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const totalPages = Math.ceil(count! / itemsPerPage)

    const prevPage = currentPage > 1
    const firstPage = currentPage > 2
    const prevDots = currentPage > 3
    const pageNumber = []
    const offset = 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        if (i > 0 && i <= totalPages) {
            pageNumber.push(i)
        }
    }
    const nextDots = currentPage < totalPages - 2
    const lastPage =
        currentPage !== totalPages && currentPage !== totalPages - 1
    const nextPage = currentPage < totalPages

    const handleChangePage = (value: number) => {
        const params = new URLSearchParams(searchParams)

        if (value && value !== 1) {
            params.set('page', String(value))
        } else {
            params.delete('page')
        }

        params.delete('loadMore')
        replace(`${pathname}?${params.toString()}`)
    }

    const loadMore = (value: number, loadMore: boolean = false) => {
        const params = new URLSearchParams(searchParams)

        if (value && value !== 1) {
            params.set('page', String(value))
            loadMore && params.set('loadMore', 'true')
        } else {
            params.delete('loadMore')
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="my-5 flex flex-col">
            {currentPage < totalPages && (
                <Button
                    onClick={() => loadMore(currentPage + 1, true)}
                    className="mb-8 flex self-center"
                >
                    Load more
                </Button>
            )}
            <Pagination>
                <PaginationContent>
                    {prevPage && (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    handleChangePage(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                    )}

                    {firstPage && (
                        <PaginationItem>
                            <PaginationLink onClick={() => handleChangePage(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {prevDots && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {pageNumber.map((number) => (
                        <PaginationItem key={number}>
                            <PaginationLink
                                isActive={currentPage === number}
                                onClick={() => handleChangePage(number)}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {nextDots && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {lastPage && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => handleChangePage(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {nextPage && (
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    handleChangePage(currentPage + 1)
                                }
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    )
}
