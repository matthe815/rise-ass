import ISkill from './ISkill';

export default interface IArmor {
  name: string;
  atk: number;
  afi: number;
  def: number;
  type: number;
  fDef: number;
  wDef: number;
  iDef: number;
  lDef: number;
  dDef: number;
  rarity: number;
  skills: ISkill[];
  slot: number;
}
