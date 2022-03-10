import { FindGearBonuses } from 'api/GearLoader';
import IArmor from 'api/interfaces/IArmor';
import Fire from '../../../../../../assets/fire_icon.png';
import Water from '../../../../../../assets/water_icon.png';
import Thunder from '../../../../../../assets/thunder_icon.png';
import Ice from '../../../../../../assets/ice_icon.png';
import Dragon from '../../../../../../assets/dragon_icon.png';

interface PlayerStat {
  name: string;
  stat: number;
}

interface IStatDisplayParameters {
  gear: IArmor[] | null[];
}

interface IPlayerElementalStat {
  icon: string;
  stat: number;
}

function Stat({ name, stat }: PlayerStat) {
  return (
    <span>
      <b>{name}</b>: {stat}
    </span>
  );
}

function IconStat({ icon, stat }: IPlayerElementalStat) {
  return (
    <span>
      <img src={icon} alt="stat" />
      {stat}
    </span>
  );
}

export default function StatDisplay({ gear }: IStatDisplayParameters) {
  function getTotalStat(index: string): number {
    return gear
      .map((item) => (item != null ? item[index] || 0 : 0))
      .reduce((previous, current) => previous + current, 0);
  }

  const currentStats = {
    afk: getTotalStat('atk'),
    afi: getTotalStat('afi'),
    def: getTotalStat('def'),
    dDef: getTotalStat('dDef'),
    fDef: getTotalStat('fDef'),
    iDef: getTotalStat('iDef'),
    lDef: getTotalStat('lDef'),
    wDef: getTotalStat('wDef'),
  } as IArmor;

  FindGearBonuses(gear, currentStats);

  return (
    <div className="stat-display">
      <Stat name="Health" stat={100} />
      <Stat name="Stamina" stat={100} />
      <hr />
      <Stat name="Attack" stat={currentStats.afk} />
      <Stat name="Affinity" stat={currentStats.afi} />
      <Stat name="Defense" stat={1 + currentStats.def} />
      <hr />

      <div className="stat-display-element">
        <IconStat icon={Fire} stat={currentStats.fDef} />
        <IconStat icon={Water} stat={currentStats.wDef} />
        <IconStat icon={Thunder} stat={currentStats.lDef} />
        <IconStat icon={Ice} stat={currentStats.iDef} />
        <IconStat icon={Dragon} stat={currentStats.dDef} />
      </div>
    </div>
  );
}
