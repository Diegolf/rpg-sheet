import { OrdemRPGCharacterAtributes } from "../characters/ordem-rpg-character";
import { DicesFormula, Dices } from "./dices";

export interface OrdemRPGDicesFormula extends DicesFormula {
   D3: string;
   D4: string;
   D6: string;
   D10: string;
   D20: string;
   D100: string;
   HIT: string;
   Perception: string;
   Flee: string;
   Parry: string;
   Parry_Counter: string;
   Stealth: string;
   Reanimate: string;
}

export class OrdemRPGDices implements Dices {
   dicesFormulas: OrdemRPGDicesFormula;

   throwDice(formula: string, atributes: OrdemRPGCharacterAtributes): () => number {
      throw new Error('Method not implemented.');
   }
}