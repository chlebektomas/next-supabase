import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
    children: React.ReactNode
    href: string
}

export default function Link({ children, href, ...rest }: LinkProps) {
    return (
        <NextLink
            {...rest}
            href={href}
            className="text-primary transition-all duration-200 hover:underline"
        >
            {children}
        </NextLink>
    )
}
