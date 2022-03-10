/* eslint-disable import/no-cycle */
import IArmor from 'api/interfaces/IArmor';
import ArmorPiece from './armor-piece/ArmorPiece';
import './ArmorList.scss';

export interface Armor {
  name: string;
  def: number;
  atk: number;
  resistances: number[];
}

interface GearList {
  gear: IArmor[] | null[];
  onMenu: (slot: number, index?: number) => void;
}

export default function ArmorList({ gear, onMenu }: GearList) {
  return (
    <div className="armor-list">
      <ArmorPiece item={gear[4]} onMenu={() => onMenu(4)} />
      <ArmorPiece item={gear[0]} onMenu={() => onMenu(0)} />
      <ArmorPiece item={gear[1]} onMenu={() => onMenu(1)} />
      <ArmorPiece item={gear[5]} onMenu={() => onMenu(5)} />
      <ArmorPiece item={gear[2]} onMenu={() => onMenu(2)} />
      <ArmorPiece item={gear[3]} onMenu={() => onMenu(3)} />

      <button type="button" onClick={() => onMenu(-1, 2)}>
        Generate
      </button>
    </div>
  );
}
