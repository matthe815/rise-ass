/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface SkillObject {
  clickable?: boolean;
  name: string;
  level: number;
  onClick?: () => void;
}

export default function Skill({
  clickable,
  name,
  level,
  onClick,
}: SkillObject) {
  return (
    <div className={clickable ? 'armor-piece' : 'skill'} onClick={onClick}>
      <span>
        {name}
        <span>{'★'.repeat(level)}</span>
      </span>
    </div>
  );
}

Skill.defaultProps = {
  clickable: false,
  onClick: () => {},
};
