import { Armor } from '../../armor-list/ArmorList';
import Skill from './Skill';

interface GearType {
  gear: Armor[];
}

export default function SkillList({ gear }: GearType) {
  const skills = [];

  gear.forEach((item) => {
    if (item.skills == null) return [];

    item.skills.forEach((skill) => {
      return skills.push(skill);
    });

    return true;
  });

  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill name={skill.name} level={1} />
      ))}
    </div>
  );
}
