import {
   ordemParanormalExpertises,
   OrdemParanormalExpertisesCodes
} from './../../characters/ordem-paranormal-character/ordem-paranormal-expertises';
import {
   ordemParanormalCharacterAtributesInfo,
   OrdemParanormalCharacterAtributes,
   OrdemParanormalAtributesCodes
} from './../../characters/ordem-paranormal-character/ordem-paranormal-atributes';
import { DicesFormulas, Dices, Dice, rollFromTo, RollResult } from '../dices';

export interface OrdemParanormalDice extends Dice {
   expertises?: OrdemParanormalExpertisesCodes[];
   attributeCode?: OrdemParanormalAtributesCodes;
}

export interface OdemParanormalDicesFormula extends DicesFormulas {
   [Name: string]: OrdemParanormalDice;
}

const ordemParanormalDicesFormula: OdemParanormalDicesFormula = {
   d3: { name: 'D3', roll: () => ({ value: rollFromTo(1, 3) }) },
   d4: { name: 'D4', roll: () => ({ value: rollFromTo(1, 4) }) },
   d6: { name: 'D6', roll: () => ({ value: rollFromTo(1, 6) }) },
   d8: { name: 'D8', roll: () => ({ value: rollFromTo(1, 8) }) },
   d10: { name: 'D10', roll: () => ({ value: rollFromTo(1, 10) }) },
   d12: { name: 'D12', roll: () => ({ value: rollFromTo(1, 12) }) },
   d20: { name: 'D20', roll: () => ({ value: rollFromTo(1, 20) }) },
   d100: { name: 'D100', roll: () => ({ value: rollFromTo(1, 100) }) }
};

export class OrdemParanormalDices implements Dices {
   dicesFormulas: OdemParanormalDicesFormula = ordemParanormalDicesFormula;

   constructor() {
      const atributesExpertises = ordemParanormalExpertises.reduce((acc, value) => {
         value.afectedByAtributes.forEach(afectedAtribute =>
            acc[afectedAtribute] = acc[afectedAtribute] ? [...acc[afectedAtribute], value.code] : [value.code]
         );
         return acc;
      }, {});

      /*  Ao entrar na tela de dados esta informação será utilizada para construir a lista de perícias por dado com cores
         diferentes para as que o personagem possui.
      */
      ordemParanormalCharacterAtributesInfo.forEach(atributeInfo => {
         this.dicesFormulas[atributeInfo.code] = {
            name: atributeInfo.name,
            description: atributeInfo.description,
            expertises: atributesExpertises[atributeInfo.code],
            attributeCode: atributeInfo.code,
            roll: () => ({ value: rollFromTo(1, 20) })
         };
      });
   }

   // rollDice(dice: OrdemParanormalDice, atributes?: OrdemParanormalCharacterAtributes): RollResult {
   //    return dice.roll();
   // }
}
