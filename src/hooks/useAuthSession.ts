// hooks/useSession.ts
import { getSession } from "@/services/authService";
import type { User } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react"; // adjust the import path

export function useAuthSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserSession = async () => {
            const { session } = await getSession();

            if (!session) {
                console.error("Error fetching session:");
                setSession(null);
                setUser(null);
            } else {
                setSession(session);
                setUser(session?.user ?? null);
            }
            setLoading(false);
        };
        getUserSession();
    }, []);

    return { session, user, loading };
}
