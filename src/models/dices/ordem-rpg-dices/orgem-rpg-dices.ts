import { OrdemRPGCharacterAtributes } from '../../characters/ordem-rpg-character';
import { DicesFormulas, Dices, Dice, rollFromTo, RollResult } from '../dices';

export interface OrdemRPGDicesFormulas extends DicesFormulas {
   d3: Dice;
   d4: Dice;
   d6: Dice;
   d10: Dice;
   d20: Dice;
   d100: Dice;
   hit: Dice;
   perception: Dice;
   flee: Dice;
   parry: Dice;
   parryCounter: Dice;
   stealth: Dice;
   reanimate: Dice;
}

const ordemRPGDicesFormula: OrdemRPGDicesFormulas = {
   d3: { roll: () => ({value: rollFromTo(1, 3)}) },
   d4: { roll: () => ({value: rollFromTo(1, 4)}) },
   d6: { roll: () => ({value: rollFromTo(1, 6)}) },
   d10: { roll: () => ({value: rollFromTo(1, 10)}) },
   d20: { roll: () => ({value: rollFromTo(1, 20)}) },
   d100: { roll: () => ({value: rollFromTo(1, 100)}) },
   hit: {
      description: 'Habilidade de acertar um ataque.',
      name: 'Acerto',
      formulaDescription: 'D20 + (Destreza * 2)',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d20Result = rollFromTo(1, 20);
         const modifierResult = atributes.dex * 2;
         return handleRollResult(d20Result, modifierResult);
      }
   },
   perception: {
      description: 'Perícia para notar/perceber acontecimentos ao redor ou encontrar coisas.',
      name: 'Percepção',
      formulaDescription: 'D20 + (Inteligência * 2)',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d20Result = rollFromTo(1, 20);
         const modifierResult = atributes.int * 2;
         return handleRollResult(d20Result, modifierResult);
      }
   },
   flee: {
      description: 'Perícia para esquivar de um ataque.',
      name: 'Esquivar',
      formulaDescription: 'D20 + ((Agilidade - Vigor) * 2)',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d20Result = rollFromTo(1, 20);
         const modifierResult = (atributes.agi - atributes.vig) * 2;
         return handleRollResult(d20Result, modifierResult);
      }
   },
   parry: {
      description: 'Perícia para aparar um ataque reduzindo o dano pela metade.',
      name: 'Aparar',
      formulaDescription: 'D20 + Destreza',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d20Result = rollFromTo(1, 20);
         const modifierResult = atributes.dex;
         return handleRollResult(d20Result, modifierResult);
      }
   },
   parryCounter: {
      description: 'Perícia para aparar um ataque reduzindo o dano pela metade e revidar.',
      name: 'Aparar e Revidar',
      formulaDescription: 'D10 + (Destreza * 2)',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d10Result = rollFromTo(1, 10);
         const modifierResult = atributes.dex * 2;
         return handleRollResult(d10Result, modifierResult);
      }
   },
   stealth: {
      description: 'Perícia para realizar movimentos sem ser notado pelo inimigo.',
      name: 'Furtividade',
      formulaDescription: 'D20 + Destreza',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d20Result = rollFromTo(1, 20);
         const modifierResult = atributes.dex;
         return handleRollResult(d20Result, modifierResult);
      }
   },
   reanimate: {
      description: 'Habilidade de levantar um aliado desmaiado.',
      name: 'Reanimar',
      formulaDescription: 'D20',
      roll: (atributes: OrdemRPGCharacterAtributes) => {
         const d20Result = rollFromTo(1, 20);
         const modifierResult = Math.floor(atributes.int/3) * 5;
         return handleRollResult(d20Result, modifierResult);
      }
   }
};

export class OrdemRPGDices implements Dices {
   dicesFormulas: OrdemRPGDicesFormulas = ordemRPGDicesFormula;

   rollDice(dice: Dice, atributes?: OrdemRPGCharacterAtributes): RollResult {
      return dice.roll(atributes);
   }
}

const handleRollResult = (d20Result: number, modifierResult: number): RollResult => ({
   value: (d20Result + modifierResult) <= 0 ? 1 : (d20Result + modifierResult),
   formulaParsedDescription: `${d20Result} ${modifierResult > 0 ? '+' : '-'}${modifierResult}`
});
