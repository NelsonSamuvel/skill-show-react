import { Button } from "@/components/ui/button";
import FormCard from "@/components/ui/FormCard";
import SkillSelector from "@/components/ui/SkillSelector";
import { useAuthSession } from "@/hooks/useAuthSession";
import { updateUserProfile } from "@/services/profileService";
import { showErrMsg, showSuccessMsg } from "@/utils";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";

const SkillsFormPage = () => {
  const { user } = useAuthSession();

  const [skillset, setSkillset] = useState<string[]>([]);
  const [skillErr, setSkillErr] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!skillset.length) {
      handleSkillErr("Add one or more skill");
    }

    if (!user) {
      toast.error("Please login before updating your profile");
      return;
    }

    try {
      await updateUserProfile({ skills: skillset }, user.id);
      showSuccessMsg("Skills updated successfully");
    } catch (error) {
      showErrMsg(error);
    }
  };

  const handleSkillErr = (errMsg: string) => {
    setSkillErr(errMsg);
  };

  return (
    <FormCard
      title="Update your Skills"
      subTitle="Let others know what you’re skilled in. Start adding your top strengths now.
"
    >
      <form onSubmit={handleSubmit} className="my-4 space-y-4  pb-4">
        <div className="space-y-2">
          <label htmlFor="skills" className="block ">
            What are you expert at?
          </label>
          <p className="text-sm text-light-gray">
            (Type your skill and hit Enter to add it )
          </p>
        </div>
        <SkillSelector
          skillErr={skillErr}
          handleSkillErr={handleSkillErr}
          skillset={skillset}
          setSkillset={setSkillset}
        />

        <Button type="submit" className="form-btn mt-4">
          Update Skills
        </Button>
      </form>
    </FormCard>
  );
};

export default SkillsFormPage;
