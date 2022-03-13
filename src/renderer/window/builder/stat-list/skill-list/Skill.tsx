/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import White from '../../../../../../assets/white_skill_icon.png';
import Orange from '../../../../../../assets/orange_skill_icon.png';
import Pink from '../../../../../../assets/pink_skill_icon.png';
import Green from '../../../../../../assets/green_skill_icon.png';
import Red from '../../../../../../assets/red_skill_icon.png';
import Cyan from '../../../../../../assets/cyan_skill_icon.png';
import Brown from '../../../../../../assets/brown_skill_icon.png';

const icons = [White, Orange, Pink, Green, Red, Cyan, Brown];

interface ISkillParameters {
  clickable?: boolean;
  name: string;
  level: number;
  maxLevel: number;
  icon: number;
  onClick?: () => void;
}

export default function Skill({
  clickable,
  name,
  level,
  maxLevel,
  icon,
  onClick,
}: ISkillParameters) {
  return (
    <div className={clickable ? 'armor-piece' : 'skill'} onClick={onClick}>
      <img src={icons[icon || 0]} alt="icon" />
      <div>
        <span>{name}</span>
        <span>
          <Skill.Level level={level} maxLevel={maxLevel} />
          <span>
            lv <b>{level}</b>
          </span>
        </span>
      </div>
    </div>
  );
}

interface ILevelParameters {
  level: number;
  maxLevel: number;
}

Skill.Level = ({ level, maxLevel }: ILevelParameters) => {
  function DrawLevelBar() {
    const elements = [];
    for (let tick = 1; tick <= maxLevel; tick += 1) {
      const elem = (
        <div className="level-tic">
          {tick <= level && <div className="level-tic-color" />}
        </div>
      );
      elements.push(elem);
    }
    return elements;
  }

  return <div>{DrawLevelBar()}</div>;
};

Skill.defaultProps = {
  clickable: false,
  onClick: () => {},
};
