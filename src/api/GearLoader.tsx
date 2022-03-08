const json: object[] = require('./ArmorList.json');
const skillJson: object[] = require('./SkillList.json');

// Convert skills
json.forEach((item) => {
  if (!item.skills) return;
  item.skills = item.skills.map((skill) => skillJson[skill.id]);
});

export default function GetGearBySlot(slot: number): any[] {
  return json.filter((item) => item.slot === slot);
}
