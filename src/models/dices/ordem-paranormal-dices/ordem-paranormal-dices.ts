import { ordemParanormalExpertises, OrdemParanormalExpertisesCodes } from '../../characters/ordem-paranormal-character/expertises';
import {
   ordemParanormalCharacterAtributesInfo,
   OrdemParanormalAtributesCodes
} from '../../characters/ordem-paranormal-character/atributes';
import { DicesFormulas, Dices, Dice, rollFromTo, RollResult } from '../dices';

export interface OrdemParanormalDice extends Dice {
   expertises?: OrdemParanormalExpertisesCodes[];
   attributeCode?: OrdemParanormalAtributesCodes;
}

export interface OdemParanormalDicesFormula extends DicesFormulas {
   [Name: string]: OrdemParanormalDice;
}

const ordemParanormalDicesFormula: OdemParanormalDicesFormula = {
   d3: { name: 'D3', roll: () => ({ value: rollFromTo(1, 3) }), askAmount: true },
   d4: { name: 'D4', roll: () => ({ value: rollFromTo(1, 4) }), askAmount: true },
   d6: { name: 'D6', roll: () => ({ value: rollFromTo(1, 6) }), askAmount: true },
   d8: { name: 'D8', roll: () => ({ value: rollFromTo(1, 8) }), askAmount: true },
   d10: { name: 'D10', roll: () => ({ value: rollFromTo(1, 10) }), askAmount: true },
   d12: { name: 'D12', roll: () => ({ value: rollFromTo(1, 12) }), askAmount: true },
   d20: { name: 'D20', roll: () => ({ value: rollFromTo(1, 20) }), askAmount: true },
   d100: { name: 'D100', roll: () => ({ value: rollFromTo(1, 100) }), askAmount: true }
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
