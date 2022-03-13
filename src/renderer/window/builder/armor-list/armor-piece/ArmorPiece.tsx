/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-cycle */
import ISkill from 'api/interfaces/ISkill';
import IArmor from 'api/interfaces/IArmor';
import Attack from '../../../../../../assets/attack_icon.png';
import Affinity from '../../../../../../assets/affinity_icon.png';
import Defense from '../../../../../../assets/defense_icon.png';
import Fire from '../../../../../../assets/fire_icon.png';
import Water from '../../../../../../assets/water_icon.png';
import Thunder from '../../../../../../assets/thunder_icon.png';
import Ice from '../../../../../../assets/ice_icon.png';
import Dragon from '../../../../../../assets/dragon_icon.png';
import Helm from '../../../../../../assets/helmet_icon.png';
import Chest from '../../../../../../assets/chest_icon.png';
import Arm from '../../../../../../assets/arm_icon.png';
import Waist from '../../../../../../assets/waist_icon.png';
import Leg from '../../../../../../assets/leg_icon.png';

import White from '../../../../../../assets/white_skill_icon.png';
import Orange from '../../../../../../assets/orange_skill_icon.png';
import Pink from '../../../../../../assets/pink_skill_icon.png';
import Green from '../../../../../../assets/green_skill_icon.png';
import Red from '../../../../../../assets/red_skill_icon.png';
import Cyan from '../../../../../../assets/cyan_skill_icon.png';
import Brown from '../../../../../../assets/brown_skill_icon.png';

const icons = [White, Orange, Pink, Green, Red, Cyan, Brown];

const slots = [Helm, Chest, Waist, Leg, Chest, Arm];

interface Piece {
  item: IArmor | null;
  onMenu: (open: number) => void;
  inline?: boolean;
}

export default function ArmorPiece({ item, onMenu, inline }: Piece) {
  return (
    <div
      className={`armor-piece ${inline ? 'inline' : ''}`}
      onClick={() => onMenu(1)}
    >
      <div
        className="armor-icon"
        style={{ backgroundImage: `url(${slots[item?.slot || 0]})` }}
      />
      <div className="armor-content">
        <div className="armor-info">
          <span className="armor-name">{item?.name || 'None'}</span>
          {!inline && (
            <span>
              <ArmorPiece.ArmorStat icon={Attack} stat={item?.atk} />
              <ArmorPiece.ArmorStat icon={Affinity} stat={item?.afi} />
              <ArmorPiece.ArmorStat icon={Defense} stat={item?.def} />
              <ArmorPiece.ArmorStat icon={Fire} stat={item?.fDef} />
              <ArmorPiece.ArmorStat icon={Water} stat={item?.wDef} />
              <ArmorPiece.ArmorStat icon={Thunder} stat={item?.lDef} />
              <ArmorPiece.ArmorStat icon={Ice} stat={item?.iDef} />
              <ArmorPiece.ArmorStat icon={Dragon} stat={item?.dDef} />
            </span>
          )}
        </div>

        {!inline && (
          <div className="armor-skills">
            {(item?.skills || []).map((skill: ISkill) => {
              return (
                <div>
                  <img src={icons[skill.icon || 0]} alt="icon" />{' '}
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

ArmorPiece.defaultProps = {
  inline: false,
};

interface IArmorStatParameters {
  icon: string;
  stat: number | undefined;
}

ArmorPiece.ArmorStat = ({ icon, stat }: IArmorStatParameters) => {
  if (stat === undefined || stat === 0) return null;

  return (
    <>
      <img src={icon} alt={icon} />
      <span>{stat}</span>
    </>
  );
};
