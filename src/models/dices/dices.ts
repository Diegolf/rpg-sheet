import { CharacterAtributes } from '../characters/character';

export type DiceFormula = (atributes?: CharacterAtributes) => number;

export interface DicesFormulas {
   [Name: string]: DiceFormula;
}

export interface Dices {
   dicesFormulas: DicesFormulas;
   rollDice(formula: DiceFormula, atributes?: CharacterAtributes): number | null;
}

export const roll = (maxValue: number) => {
   return 0;
}