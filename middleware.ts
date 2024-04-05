import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/_lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const result = await updateSession(request)

    const requestUrl = new URL(request.url)
    const origin = requestUrl.origin
    const path = requestUrl.pathname

    if (!result.userAuth.data.user && path === '/account') {
        return NextResponse.redirect(`${origin}/signin`)
    }

    return result.response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
