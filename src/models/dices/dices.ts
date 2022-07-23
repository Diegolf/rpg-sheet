import { CharacterAtributes } from '../characters/character';

export interface RollResult {
   value: number;
   formulaParsedDescription?: string;
}

export type DiceFormula = (atributes?: CharacterAtributes) => RollResult;

export interface Dice {
   name?: string;
   description?: string;
   formulaDescription?: string;
   roll: DiceFormula;
   getParsedFormulaDescription?: () => string;
}

export interface DicesFormulas {
   [Name: string]: Dice;
}

export interface Dices {
   dicesFormulas: DicesFormulas;
   rollDice(dice: Dice, atributes?: CharacterAtributes): RollResult;
}

export const rollFromTo = (minValue: number, maxValue: number) => 0;
