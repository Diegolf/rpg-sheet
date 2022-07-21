import { CharacterAtributes } from "../characters/character";
import { DiceFormula, DicesFormulas, Dices } from "./dices";

export interface OrdemRPGDicesFormula extends DicesFormulas {
   D3: DiceFormula;
   D4: DiceFormula;
   D6: DiceFormula;
   D10: DiceFormula;
   D20: DiceFormula;
   D100: DiceFormula;
   HIT: DiceFormula;
   Perception: DiceFormula;
   Flee: DiceFormula;
   Parry: DiceFormula;
   Parry_Counter: DiceFormula;
   Stealth: DiceFormula;
   Reanimate: DiceFormula;
}

export class OrdemRPGDices implements Dices {
   dicesFormulas: OrdemRPGDicesFormula;

   rollDice(formula: DiceFormula, atributes?: CharacterAtributes): number {
      return formula(atributes);
   }   
}