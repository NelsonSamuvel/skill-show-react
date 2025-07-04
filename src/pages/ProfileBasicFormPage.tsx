import { Button } from "@/components/ui/button";
import FormCard from "@/components/ui/FormCard";
import { Input } from "@/components/ui/input";
import BasicFormSkeleton from "@/components/ui/Skeleton/BasicFormSkeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuthSession } from "@/hooks/useAuthSession";
import {
  getCurrentUserProfile,
  updateUserProfile,
} from "@/services/profileService";
import type { BasicProfileType } from "@/types/profile.types";
import { showErrMsg } from "@/utils";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";

const ProfileBasicFormPage = () => {
  const { user } = useAuthSession();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsFetchingProfile(true);
        const profile: BasicProfileType = await getCurrentUserProfile();
        setFormData({
          ...formData,
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          bio: profile.bio || "",
        });
      } catch (error) {
        showErrMsg(error);
      } finally {
        setIsFetchingProfile(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.firstName && !formData.bio && !formData.lastName) {
      return;
    }

    if (!user) {
      toast.error("Please login before updating your profile");
      return;
    }

    try {
      setIsUpdating(true);
      await updateUserProfile(formData, user.id);
      toast.success("profile updated  successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  if (isFetchingProfile) {
    return <BasicFormSkeleton />;
  }

  return (
    <FormCard
      title={"Update Profile"}
      subTitle={"Update your personal information and projects"}
    >
      <form className="my-4" onSubmit={handleSubmit}>
        {/*Form Fields  */}
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <label htmlFor="firstName" className="md:basis-36">
            First Name
          </label>
          <Input
            value={formData.firstName}
            onChange={handleChange}
            id="firstName"
            disabled={isUpdating}
            placeholder="Enter your first name"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <label htmlFor="lastName" className="md:basis-36">
            Last Name
          </label>
          <Input
            value={formData.lastName}
            onChange={handleChange}
            id="lastName"
            disabled={isUpdating}
            placeholder="Enter your last name"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 mb-6">
          <label htmlFor="email" className="md:basis-36">
            Email
          </label>
          <Input
            id="email"
            disabled={true}
            value={user?.email}
            placeholder="Enter your Email"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 mb-8">
          <label htmlFor="bio" className="md:basis-36">
            Bio
          </label>
          <Textarea
            value={formData.bio}
            onChange={handleChange}
            id="bio"
            disabled={isUpdating}
            placeholder="Enter your last name"
            className="h-24"
          />
        </div>

        <Button disabled={isUpdating} type="submit" className="w-full md:w-fit">
          Update
        </Button>
      </form>
    </FormCard>
  );
};

export default ProfileBasicFormPage;
