export type User = {
    id: string
    app_metadata: {
        provider: string
        [key: string]: any
    }
    user_metadata: {
        [key: string]: any
    }
    aud: string
    email: string | null
    phone: string | null
    created_at: string
    confirmed_at: string | null
    email_confirmed_at: string | null
    phone_confirmed_at: string | null
    last_sign_in_at: string | null
    role: string
    updated_at: string
    identities: Array<{
        id: string
        user_id: string
        identity_data: {
            email?: string
            sub?: string
            [key: string]: any
        }
        provider: string
        created_at: string
        last_sign_in_at: string
        updated_at: string
    }>
}
