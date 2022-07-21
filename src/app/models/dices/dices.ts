import { CharacterAtributes } from '../characters/character';

export interface DicesFormula {
   [Name: string]: string
}

export interface Dices {
   dicesFormulas: DicesFormula;
   throwDice(formula: string, atributes: CharacterAtributes): () => number | null;
}