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
} from '@/components/ui/pagination'
import { Button } from './ui/button'

type PaginationProps = {
    currentPage: number
    lastPage: number
}

export default function PaginationSection({
    currentPage,
    lastPage,
}: PaginationProps) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

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
            {currentPage < lastPage && (
                <Button
                    onClick={() => loadMore(currentPage + 1, true)}
                    className="mb-8 flex self-center"
                >
                    Load more
                </Button>
            )}
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    handleChangePage(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                    )}
                    {currentPage > 2 && (
                        <PaginationItem>
                            <PaginationLink onClick={() => handleChangePage(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage > 3 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    {currentPage !== 1 && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() =>
                                    handleChangePage(currentPage - 1)
                                }
                            >
                                {currentPage - 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>
                    {currentPage !== lastPage && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() =>
                                    handleChangePage(currentPage + 1)
                                }
                            >
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    {currentPage !== lastPage &&
                        currentPage !== lastPage - 1 &&
                        currentPage !== lastPage - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                    {currentPage !== lastPage &&
                        currentPage !== lastPage - 1 && (
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => handleChangePage(lastPage)}
                                >
                                    {lastPage}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    {currentPage < lastPage && (
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
