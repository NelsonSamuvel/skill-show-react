import { supabase } from "@/lib/supabaseClient"

export const fetchSkills = async (name: string) => {
    const { data, error } = await supabase.from("skills").select("name").ilike("name", `%${name}%`)
    if (error) throw new Error(error.message);
    return data;
}





