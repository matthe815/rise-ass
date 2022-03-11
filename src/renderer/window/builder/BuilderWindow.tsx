import GetGearBySlot from 'api/GearLoader';
import IArmor from 'api/interfaces/IArmor';
import { useState } from 'react';
import ArmorList from './armor-list/ArmorList';
import ArmorListModal from './modals/ArmorListModal';
import SetGeneratorModal from './modals/SetGeneratorModal';
import SkillList from './stat-list/skill-list/SkillList';
import StatDisplay from './stat-list/stat-display/StatDisplay';

let slotType = 0;

export default function Builder() {
  const [gear, setGear] = useState<IArmor[] | null[]>([]);
  const [modalOpen, setModalOpen] = useState(-1);
  const [viewableItems, setViewableItems] = useState<IArmor[]>([]);

  /**
   * Fired when the modal is set to be opened. Includes information on which one to open.
   * @param slot Slot-type. Used for filtering the menus.
   * @param index Modal index to open.
   */
  function openModal(slot: number, index = 1) {
    slotType = slot;
    setModalOpen(index);
    setViewableItems([...GetGearBySlot(slot)]);
  }

  /**
   * Sets a specified gear piece within a certain slot.
   * @param slot The slot to apply the piece to.
   * @param armor The piece to apply to the slot.
   */
  function changeGear(slot: number, armor: IArmor | null) {
    gear[slot] = armor;
    setGear(gear);
    setModalOpen(-1);
  }

  /**
   * Applies a full set to the builder.
   * @param set The set to apply.
   */
  function applySet(set: IArmor[]) {
    setGear([set[0], set[1], set[3], set[4], null, set[2]]);
    setModalOpen(-1);
  }

  return (
    <>
      {modalOpen === 2 && (
        <SetGeneratorModal
          onClose={setModalOpen}
          onApply={(set) => applySet(set)}
        />
      )}

      {modalOpen === 1 && (
        <ArmorListModal
          onClose={setModalOpen}
          items={viewableItems}
          setGear={(slot, armor) => changeGear(slot, armor)}
          slotType={slotType}
          isWeapon={slotType === 4}
        />
      )}

      <div className="builder-window">
        <ArmorList
          gear={gear}
          onMenu={(slot, index) => openModal(slot, index)}
        />
        <SkillList gear={gear} />
        <StatDisplay gear={gear} />
      </div>
    </>
  );
}
