import { CharacterAtributes } from '../characters/character';

/** Result of a dice roll */
export interface RollResult {
   /** Final value after modifiers */
   value: number;

   /** Info like wheather it has or not hit a Critical */
   aditionalInfo?: string;

   /** Explanation of the formula of the dice roll */
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
   // rollDice(dice: Dice, atributes?: CharacterAtributes): RollResult;
}

export const rollFromTo = (minValue: number, maxValue: number) => Math.round(Math.random() * (maxValue - minValue)) + minValue;
