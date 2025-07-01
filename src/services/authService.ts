import { supabase } from "../lib/supabaseClient";

export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

// Sign In
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

// Get current user
export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

// Sign out
export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}

// get Session

export const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return { session };
}