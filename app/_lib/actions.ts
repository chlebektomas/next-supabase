'use server'

import { createClient } from '@/_lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/signin?message=Could not authenticate user')
    }

    return redirect('/signin?message=Check email to continue sign in process')
}

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/signin?message=Could not authenticate user')
    }

    return redirect('/account')
}

export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()

    return redirect('/')
}

export async function addToFavorites(userId: string, pokemonId: string) {
    try {
        const supabase = createClient()

        await supabase
            .from('favorites')
            .insert({ user_id: userId, pokemon_id: pokemonId })
    } catch (error) {
        throw new Error('Error adding to favorites')
    }

    revalidatePath('/pokemons')
}

export async function removeFromFavorites(userId: string, pokemonId: string) {
    try {
        const supabase = createClient()

        await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .eq('pokemon_id', pokemonId)
    } catch (error) {
        throw new Error('Error removing from favorites')
    }

    revalidatePath('/pokemons')
}
