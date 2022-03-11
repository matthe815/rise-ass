/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-loop-func */
import IArmor from './interfaces/IArmor';
import ISkill from './interfaces/ISkill';

const json: IArmor[] = require('./ArmorList.json');
const skillJson: ISkill[] = require('./SkillList.json');

// Convert skills
json.forEach((item) => {
  if (!item.skills) return;
  item.skills = item.skills.map((skill) =>
    Object.assign(skillJson[skill.id], { level: skill.level })
  );
});

export function GetSkills(): ISkill[] {
  return skillJson;
}

/**
 * Get all armors within a certain slot.
 */
export default function GetGearBySlot(slot: number): IArmor[] {
  return json.filter((item) => item.slot === slot);
}

function MakeGearColumns() {
  const gearSlots: IArmor[][] = [
    GetGearBySlot(0),
    GetGearBySlot(1),
    GetGearBySlot(5),
    GetGearBySlot(2),
    GetGearBySlot(3),
  ];

  return gearSlots;
}

function MakeCombos(): IArmor[][] {
  const columns = MakeGearColumns();
  const combos: IArmor[][] = [];

  for (const head of columns[0]) {
    for (const body of columns[1]) {
      for (const arms of columns[2]) {
        for (const waist of columns[3]) {
          for (const legs of columns[4]) {
            combos.push([head, body, arms, waist, legs]);
          }
        }
      }
    }
  }

  return combos;
}

const gearCombos = MakeCombos();

/**
 * Determine the active skills from within a specified armor set.
 * @param Set Armor sets including null handles.
 * @returns A list of active skills.
 */
export function DetermineSkillsForSet(Set: IArmor[] | null[]): ISkill[] {
  const skills: ISkill[] = [];

  // Loop all of the active components within a supplied armor set.
  Set?.forEach((armor: IArmor | null) => {
    if (armor === null || armor.skills === undefined) return;

    armor.skills.forEach((skill) => {
      const searchSkill = skills.find((skil) => skil.name === skill.name);

      // If a skill is already known within the skill array, just increment the level instead of duplicating.
      if (searchSkill) {
        if (searchSkill.level === undefined) searchSkill.level = 1; // Initalize search skill.
        searchSkill.level += 1;
        return;
      }

      skills.push(Object.assign(skill, { level: 1 }));
    });
  });

  return skills;
}

/**
 * Get all bonuses related to gear skills.
 * @param gear The gear.
 */
export function FindGearBonuses(gear: IArmor[], currentStats: IArmor[]): void {
  const skills = DetermineSkillsForSet(gear);

  skills.forEach((skill: ISkill) => {
    if (!skill.calculation || !skill.level) return;

    const { maths } = skill.calculation[skill.level - 1];

    maths.forEach((math) => {
      switch (math.type) {
        case 1:
          currentStats[math.stat] += Math.floor(
            currentStats[math.stat] * (1 / math.increment)
          );
          break;
        default:
        case 0:
          currentStats[math.stat] += math.increment;
          break;
      }
    });
  });
}

export interface BruteForceResults {
  skills: ISkill[];
  set: IArmor[];
}

/**
 * Attempt to brute-force together a set that matches the criteria.
 * @param armors The avaliable armors.
 * @param desiredSkills The desired skills.
 * @returns The set; if one is found.
 */
function BruteForceSet(
  armors: IArmor[],
  desiredSkills: ISkill[]
): BruteForceResults | undefined {
  const set: IArmor[] = [null, null, null, null, null];

  // Loop through all of the available matching armors to see what can be made.
  armors.forEach((armor) => {
    if (set[armor.slot] === null) set[armor?.slot] = armor;
  });

  const skills = DetermineSkillsForSet(set); // Determine the skills equipped to the current set.
  let valid = true;

  desiredSkills.forEach((desiredSkill) => {
    const find = skills.find((skil) => skil.name === desiredSkill.name);
    if (!find || find.level < desiredSkill.level) valid = false;
    return true;
  });

  if (valid) return { set, skills };
  return undefined;
}

/**
 * Get all gear pieces within a certain skill attached in no particular order.
 * @param skills The skills to look for.
 * @returns All pieces.
 */
// TODO; Turn into callback based async system.
function GetAllWithSkill(skills: ISkill[]): IArmor[][] {
  return gearCombos.filter((set: IArmor[]) => {
    const setSkills = DetermineSkillsForSet(set);

    for (const skill of skills) {
      const setSkill = setSkills.find((skil) => skil.name === skill.name);
      if (!setSkill || (setSkill.level || 0) < (skill.level || 0)) return false;
    }

    return true;
  });
}

/**
 * Attempt to brute-force combine the sets into something usable, returning the valid sets via callback.
 * @param skills The skills to look for.
 * @param next The callback to work from.
 */
/// TODO; Replace with just GetAllWithSkill
export function TryCombineSets(
  skills: ISkill[],
  next: (result: BruteForceResults, remaining: number) => void
): void {
  const armorSkillList = GetAllWithSkill(skills).splice(0, 20);

  // Loop through all of the combinations to find a set and return the call backs.
  armorSkillList.forEach((result, index) => {
    if (result === undefined) return;
    next(
      { set: result, skills: DetermineSkillsForSet(result) },
      armorSkillList.length - 1 - index
    );
  });
}
