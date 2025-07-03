import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile: BasicProfileType = await getCurrentUserProfile();
        setFormData({
          ...formData,
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio,
        });
      } catch (error) {
        showErrMsg(error);
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
      await updateUserProfile(formData, user.id);
      toast.success("profile updated  successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.error(error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <section className="padding-md">
      <div className="border border-surface bg-surface padding-sm rounded-sm">
        <div className="space-y-1 border-b pb-4">
          <h4 className="font-medium">Update Profile</h4>
          <p className="text-sm text-light-gray">
            Update your personal information and projects
          </p>
        </div>
        <form className="my-4" onSubmit={handleSubmit}>
          {/*Form Fields  */}
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <label htmlFor="firstName">First Name</label>
            <Input
              value={formData.firstName}
              onChange={handleChange}
              id="firstName"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <label htmlFor="lastName">Last Name</label>
            <Input
              value={formData.lastName}
              onChange={handleChange}
              id="lastName"
              placeholder="Enter your last name"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <label htmlFor="lastName">Email</label>
            <Input id="lastName" placeholder="Enter your Email" />
          </div>
          <div className="flex flex-col md:flex-row gap-2 mb-8">
            <label htmlFor="bio">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={handleChange}
              id="bio"
              placeholder="Enter your last name"
              className="h-24"
            />
          </div>

          <Button type="submit" className="w-full md:w-fit">
            Update
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProfileBasicFormPage;
