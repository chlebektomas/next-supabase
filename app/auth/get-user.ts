import { createClient } from '@/_lib/supabase/server'

export async function getUser() {
    try {
        const supabase = createClient()

        const {
            data: { user },
        } = await supabase.auth.getUser()

        return user
    } catch (error) {
        throw new Error('Error fetching user')
    }
}
