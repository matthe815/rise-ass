export interface ISkillMath {
  stat: string;
  increment: number;
  type: number;
}

export interface ISkillLevelSet {
  maths: ISkillMath[];
}

export default interface ISkill {
  name: string;
  max_level: number;
  icon?: number;
  level?: number;
  calculation?: ISkillLevelSet[];
}
