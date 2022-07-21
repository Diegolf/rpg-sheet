import { OrdemRPGCharacterAtributes } from '../models/character';
import { OrdemRPGDices, OrdemRPGDicesFormula } from './../models/dice';

const OrdemRPGDicesFormulaMock: OrdemRPGDicesFormula = {
   D3: '[3]',
   D4: '[4]',
   D6: '[6]',
   D10: '[10]',
   D20: '[20]',
   D100: '[100]',
   HIT: '[20][+({DEX}*2)]',
   Perception: '',
   Flee: '',
   Parry: '',
   Parry_Counter: '',
   Stealth: '',
   Reanimate: ''
}

export const OrdemRPGDicesMock: OrdemRPGDices = {
   dicesFormulas: OrdemRPGDicesFormulaMock,

   throwDice: function (formula: string, atributes: OrdemRPGCharacterAtributes): () => number {   
      throw new Error('Function not implemented.');
   }
}