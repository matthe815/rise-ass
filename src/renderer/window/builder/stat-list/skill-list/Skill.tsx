interface SkillObject {
  name: string;
  level: number;
}

export default function Skill({ name, level }: SkillObject) {
  return (
    <div className="skill">
      <span>
        {name}
        <span>{'★'.repeat(level)}</span>
      </span>
    </div>
  );
}
