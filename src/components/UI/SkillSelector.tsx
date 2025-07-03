import { useState, type KeyboardEvent } from "react";
import { Badge } from "./badge";
import { X } from "lucide-react";

const SkillSelector = () => {
  const [inputVal, setInputVal] = useState("");
  const [skillset, setSkillset] = useState<string[]>([]);

  const handlekeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter") {
      e.preventDefault();
      setSkillset((curSkills) => [...curSkills, inputVal]);
      setInputVal("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    console.log("clicked");
    setSkillset((curSkills) =>
      curSkills.filter((skillName) => skillName !== skill)
    );
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="w-full border border-input px-4 py-2">
        <div className="flex gap-2 flex-wrap mb-2">
          {skillset.length > 0 && (
            <>
              {skillset.map((skill, idx) => (
                <Badge className="" key={idx}>
                  <span> {skill}</span>
                  <X
                    className="ml-2 w-3 h-3 stroke-3 cursor-pointer "
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
              <Badge
                className="cursor-pointer"
                onClick={() => setSkillset([])}
                variant={"secondary"}
              >
                Clear All
              </Badge>
            </>
          )}
        </div>

        <textarea
        id="skills"
          className="outline-none w-full  ring-0 focus:ring-0  focus:outline-none "
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handlekeyPress}
          placeholder="Enter your skills here🚀"
        />
      </div>
    </div>
  );
};

export default SkillSelector;
