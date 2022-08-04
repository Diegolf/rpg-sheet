import { CharacterAtributes } from '../characters/character';

export interface RollResult {
   value: number;
   aditionalInfo?: string;
   formulaParsedDescription?: string;
}

export type DiceFormula = (atributes?: CharacterAtributes) => RollResult;

export interface Dice {
   name?: string;
   description?: string;
   formulaDescription?: string;
   roll: DiceFormula;
}

export interface DicesFormulas {
   [Name: string]: Dice;
}

export interface Dices {
   dicesFormulas: DicesFormulas;
   rollDice(dice: Dice, atributes?: CharacterAtributes): RollResult;
}

export const rollFromTo = (minValue: number, maxValue: number) => Math.round(Math.random() * (maxValue - minValue)) + minValue;
