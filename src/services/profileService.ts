import { supabase } from "@/lib/supabaseClient"
import type { BasicProfileType } from "@/types/profile.types";


export const getCurrentUserProfile = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
        throw new Error("User not found");
    }
    const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", user?.id);
    if (profileError) {
        throw new Error("Profile Not found")
    }
    return profile[0];

}

export const updateUserProfile = async (userData: BasicProfileType, id: string) => {
    const { data: existingData } = await supabase.from("users").select("*").eq("id", id).maybeSingle();
    let query;
    if (existingData) {
        query = await supabase.from("users").update(userData).eq("id", id);
    }
    else {
        query = await supabase.from("users").insert([
            userData
        ]);
    }
    const { data, error } = query;
    if (error) {
        throw new Error(error.message);
    }

    return data;
}

