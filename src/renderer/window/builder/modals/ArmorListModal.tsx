import IArmor from 'api/interfaces/IArmor';
import { useState } from 'react';
import ArmorPiece from '../armor-list/armor-piece/ArmorPiece';

interface IArmorListModalParameters {
  onClose: (modalType: number) => void;
  setGear: (slot: number, gear: IArmor | null) => void;
  slotType: number;
  items: IArmor[];
  isWeapon: boolean;
}

const weaponTypes = [
  'Sword and Shield',
  'Great Sword',
  'Hammer',
  'Lance',
  'Gun Lance',
  'Long Sword',
  'Switch Axe',
  'Charge Axe',
  'Dual Swords',
  'Light Bowgun',
  'Heavy Bowgun',
  'Bow',
];

const elements = [
  'None',
  'Fire',
  'Water',
  'Thunder',
  'Ice',
  'Dragon',
  'Poison',
  'Paralysis',
  'Sleep',
];

export default function ArmorListModal({
  onClose,
  setGear,
  slotType,
  items,
  isWeapon,
}: IArmorListModalParameters): JSX.Element {
  const [weaponType, setWeaponType] = useState(0);
  const [element, setElement] = useState(0);

  return (
    <div className="layer">
      <div className="builder-window">
        <button role="menuitem" type="button" onClick={() => onClose(-1)}>
          Close
        </button>

        {isWeapon && (
          <ArmorListModal.WeaponFilter
            onElementSelect={(type) => setElement(type)}
            onTypeSelect={(type) => setWeaponType(type)}
          />
        )}

        <ArmorPiece item={null} onMenu={() => setGear(slotType, null)} />

        {items
          .filter((item) => !isWeapon || item.type === weaponType)
          .map((item) => {
            return (
              <ArmorPiece
                key={item.name}
                item={item}
                onMenu={() => setGear(slotType, item)}
              />
            );
          })}
      </div>
    </div>
  );
}

interface IWeaponFilterParameters {
  onTypeSelect: (type: number) => void;
  onElementSelect: (element: number) => void;
}

ArmorListModal.WeaponFilter = ({
  onTypeSelect,
  onElementSelect,
}: IWeaponFilterParameters) => {
  return (
    <>
      <select onChange={(e) => onTypeSelect(parseInt(e.target.value, 10))}>
        {weaponTypes.map((type, index) => (
          <option value={index}>{type}</option>
        ))}
      </select>

      <select onChange={(e) => onElementSelect(parseInt(e.target.value, 10))}>
        {elements.map((type, index) => (
          <option value={index}>{type}</option>
        ))}
      </select>
    </>
  );
};
