import IArmor from 'api/interfaces/IArmor';
import ISkill from 'api/interfaces/ISkill';
import Skill from './Skill';

interface ISkillListParameters {
  gear: IArmor[] | null[];
}

export default function SkillList({ gear }: ISkillListParameters) {
  const skills: ISkill[] = [];

  gear.forEach((item) => {
    if (item == null || item.skills == null) return [];

    // Run through each skill.
    item.skills.forEach((skill) => {
      // If the skill is already registered, just increment the level.
      if (skills.includes(skill)) {
        // Increment the skill
        const active = skills[skills.indexOf(skill)];
        if (!active.level) active.level = 0;
        active.level += 1;
        return false;
      }

      return skills.push(Object.assign(skill, { level: 1 }));
    });

    return true;
  });

  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill name={skill.name} level={skill.level || 1} />
      ))}
    </div>
  );
}
