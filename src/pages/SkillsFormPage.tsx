import SkillSelector from "@/components/ui/SkillSelector";

const SkillsFormPage = () => {
  return (
    <>
      <div className="mb-4 border-b pb-4">
        <label htmlFor="skills" className="">
          What are you expert at?
        </label>
        <SkillSelector />
      </div>
      <div>
        <label htmlFor=""></label>
      </div>
    </>
  );
};

export default SkillsFormPage;
