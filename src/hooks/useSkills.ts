import { fetchSkills } from "@/services/skillsService"
import { useQuery } from "@tanstack/react-query"

export const useSkillSuggestion = (search: string) => {
    return useQuery({
        queryKey: ["skill", search],
        queryFn: () => fetchSkills(search),
        enabled: !!search
    })
}