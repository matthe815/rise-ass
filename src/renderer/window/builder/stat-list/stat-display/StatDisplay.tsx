import { Armor } from '../../armor-list/ArmorList';

interface PlayerStat {
  name: string;
  stat: number;
}

interface Piece {
  gear: Armor[];
}

function Stat({ name, stat }: PlayerStat) {
  return (
    <span>
      <b>{name}</b>: {stat}
    </span>
  );
}

export default function StatDisplay({ gear }: Piece) {
  function getDefense(): number {
    return gear
      .map((item) => item.def || 0)
      .reduce((previous, current) => previous + current, 0);
  }

  function getAttack(): number {
    return gear
      .map((item) => item.atk || 0)
      .reduce((previous, current) => previous + current, 0);
  }

  return (
    <div className="stat-display">
      <Stat name="Attack" stat={getAttack()} />
      <Stat name="Defense" stat={getDefense()} />
    </div>
  );
}
