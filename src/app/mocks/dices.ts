import { DiceFormula } from './../models/dices/dices';
import { OrdemRPGCharacterAtributes } from "../models/characters/ordem-rpg-character";
import { OrdemRPGDicesFormula, OrdemRPGDices } from "../models/dices/orgem-rpg-dices";

const OrdemRPGDicesFormulaMock: OrdemRPGDicesFormula = {
   // Change from string list to methods list??
   D3: () => 0,
   D4: () => 0,
   D6: () => 0,
   D10: () => 0,
   D20: () => 0,
   D100: () => 0,
   HIT: () => 0,
   Perception: () => 0,
   Flee: () => 0,
   Parry: () => 0,
   Parry_Counter: () => 0,
   Stealth: () => 0,
   Reanimate: () => 0
}

export const OrdemRPGDicesMock: OrdemRPGDices = {
   dicesFormulas: OrdemRPGDicesFormulaMock,

   rollDice: function (formula: DiceFormula, atributes?: OrdemRPGCharacterAtributes): number {
      return formula(atributes);
   }
}