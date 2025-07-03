import { getCurrentUserProfile } from "@/services/profileService";
import type { BasicProfileType } from "@/types/profile.types";
import { useEffect, useState } from "react"

export const useUserProfile = () => {
    const [profileInfo, setProfileInfo] = useState<BasicProfileType | null>(null);


    // useEffect(() => {
    //     const fetchCurrentProfile = async () => {

    //         const data = await getCurrentUserProfile();
    //         if (data) {
    //             setProfileInfo(data);
    //         }
    //     }
    //     fetchCurrentProfile();

    // }, [])



}