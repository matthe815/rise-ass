/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BruteForceResults, GetSkills, TryCombineSets } from 'api/GearLoader';
import IArmor from 'api/interfaces/IArmor';
import ISkill from 'api/interfaces/ISkill';
import { useState } from 'react';
import ArmorPiece from '../armor-list/armor-piece/ArmorPiece';
import Modal from '../Modal';
import Skill from '../stat-list/skill-list/Skill';

interface ISetGeneratorModalParameters {
  onClose: (modalType: number) => void;
  onApply: (set: IArmor[]) => void;
}

export default function SetGeneratorModal({
  onClose,
  onApply,
}: ISetGeneratorModalParameters) {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [determinedSets, setSets] = useState<BruteForceResults[]>([]);
  const [finding, setFinding] = useState(false);

  function addSkill(skill: string) {
    setSkills([
      ...skills,
      {
        name: skill,
        max_level: 0,
        level: parseInt(
          (document.getElementById('level') as HTMLInputElement)?.value || '0',
          10
        ),
      },
    ]);
  }

  function removeSkill(skill: number) {
    skills.splice(skill, 1);
    setSkills([...skills]);
  }

  function addSet(set: BruteForceResults) {
    determinedSets.push(set);
    setSets([...determinedSets]);
  }

  // Event fired when the find sets button is clicked.
  function onCombine() {
    determinedSets.splice(0, determinedSets.length); // Clear previous search results.

    setFinding(true);
    TryCombineSets(skills, (result, remaining) => {
      if (remaining === 0) setFinding(false);
      addSet(result);
    });
  }

  return (
    <Modal>
      <button role="menuitem" type="button" onClick={() => onClose(-1)}>
        Close
      </button>

      {skills.map((skill, index) => (
        <Skill
          clickable
          name={skill.name}
          level={skill?.level || 0}
          onClick={() => removeSkill(index)}
        />
      ))}

      <SetGeneratorModal.SkillSelector onChange={(value) => addSkill(value)} />

      <button type="button" onClick={() => onCombine()}>
        {finding === false ? 'Find Sets' : 'Finding...'}
      </button>

      {determinedSets.map((set) => (
        <SetGeneratorModal.ArmorSet
          result={set}
          onApply={(madeSet: IArmor[]) => onApply(madeSet)}
        />
      ))}
    </Modal>
  );
}

interface ISkillSelectorParameters {
  onChange: (skill: string) => void;
}

SetGeneratorModal.SkillSelector = ({ onChange }: ISkillSelectorParameters) => {
  return (
    <>
      <select
        onChange={(e) => {
          onChange(e.target.value);
          e.target.selectedIndex = 0;
        }}
      >
        <option>Select</option>

        {GetSkills().map((skill: ISkill) => (
          <option key={skill.name} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </select>
      Level: <input id="level" type="number" />
    </>
  );
};

interface IArmorSetParamaters {
  result: BruteForceResults;
  onApply: (set: IArmor[]) => void;
}

SetGeneratorModal.ArmorSet = ({ result, onApply }: IArmorSetParamaters) => {
  return (
    <>
      {result.set.map((item: IArmor | null) => {
        if (item === null) return null;
        return <ArmorPiece item={item} onMenu={() => {}} key={item.name} />;
      })}

      {result.skills.map((skill: ISkill) => {
        return <Skill name={skill.name} level={skill.level || 0} />;
      })}
      <button type="button" onClick={() => onApply(result.set)}>
        Use This Set
      </button>
    </>
  );
};
