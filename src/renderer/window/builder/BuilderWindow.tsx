import GetGearBySlot from 'api/GearLoader';
import { useState } from 'react';
import ArmorPiece from './armor-list/armor-piece/ArmorPiece';
import ArmorList, { Armor } from './armor-list/ArmorList';
import SkillList from './stat-list/skill-list/SkillList';
import StatDisplay from './stat-list/stat-display/StatDisplay';

let slotType = 0;

interface BuilderType {
  onClose: (isClosed: boolean) => void;
  setGear: (slotType: number, item: Armor | null) => void;
  items: Armor[];
}

function BuilderModal({ onClose, setGear, items }: BuilderType) {
  return (
    <div className="layer">
      <div className="builder-window">
        <button role="menuitem" type="button" onClick={() => onClose(false)}>
          Close
        </button>
        <ArmorPiece item={null} onMenu={() => setGear(slotType, null)} />
        {items.map((item) => {
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

export default function Builder() {
  const [gear, setGear] = useState<Armor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewableItems, setViewableItems] = useState<Armor[]>([]);

  function openModal(slot: number) {
    slotType = slot;
    setModalOpen(true);
    setViewableItems([...GetGearBySlot(slot)]);
  }

  function changeGear(slot: number, armor: Armor) {
    gear[slot] = armor;
    setGear(gear);
    setModalOpen(false);
  }

  return (
    <>
      {modalOpen && (
        <BuilderModal
          onClose={setModalOpen}
          items={viewableItems}
          setGear={() => changeGear}
        />
      )}

      <div className="builder-window">
        <ArmorList gear={gear} onMenu={() => openModal} />
        <SkillList gear={gear} />
        <StatDisplay gear={gear} />
      </div>
    </>
  );
}
