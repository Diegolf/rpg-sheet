import { ParanormalDNDCharacterAtributes } from '../../characters/paranormal-dnd-character';
import { ParanormalDNDDices } from 'src/models/dices/paranormal-dnd-dices/paranormal-dnd-dices';

const paranormalDNDDices = new ParanormalDNDDices();
const paranormalDNDCharacterAtributesMock: ParanormalDNDCharacterAtributes = {
   agi: 0,
   vig: 0,
   dex: 0,
   int: 0
};
const repeatRollTestTimes = 1000;

describe('Ordem RPG Dices test', () => {

   beforeEach(() => {
      // Set huge values to every atribute to make sure that unwanted counts are being made
      paranormalDNDCharacterAtributesMock.agi = 100;
      paranormalDNDCharacterAtributesMock.vig = 100;
      paranormalDNDCharacterAtributesMock.dex = 100;
      paranormalDNDCharacterAtributesMock.int = 100;
   });

   it('Rolling a D3 dice should generate a number between 1 and 3.', () => {
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.d3.roll();
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(3);
      }
   });

   it('Rolling a D4 dice should generate a number between 1 and 4.', () => {
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.d4.roll();
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(4);
      }
   });

   it('Rolling a D6 dice should generate a number between 1 and 6.', () => {
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.d6.roll();
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(6);
      }
   });

   it('Rolling a D10 dice should generate a number between 1 and 10.', () => {
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.d10.roll();
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(10);
      }
   });

   it('Rolling a D20 dice should generate a number between 1 and 20.', () => {
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.d20.roll();
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a D100 dice should generate a number between 1 and 100.', () => {
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.d100.roll();
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(100);
      }
   });

   it('Rolling a "Acerto" dice should generate a number between 1 and 20 when "Dexterity" is 0.', () => {
      paranormalDNDCharacterAtributesMock.dex = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.hit.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a "Acerto" dice should generate a number between 5 and 24 when "Dexterity" is 2.', () => {
      paranormalDNDCharacterAtributesMock.dex = 2;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.hit.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(5);
         expect(rollResult.value).toBeLessThanOrEqual(24);
      }
   });

   it('Rolling a "Percepção" dice should generate a number between 1 and 20 when "Inteligence" is 0.', () => {
      paranormalDNDCharacterAtributesMock.int = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.perception.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a "Percepção" dice should generate a number between 7 and 26 when "Inteligence" is 3.', () => {
      paranormalDNDCharacterAtributesMock.int = 3;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.perception.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(7);
         expect(rollResult.value).toBeLessThanOrEqual(26);
      }
   });

   it('Rolling a "Esquivar" dice should generate a number between 1 and 20 when "Agility" and "Strength" are 0.', () => {
      paranormalDNDCharacterAtributesMock.agi = 0;
      paranormalDNDCharacterAtributesMock.vig = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.flee.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a "Esquivar" dice should generate a number between 7 and 26 when "Agility" is 3 and "Strength" is 0.', () => {
      paranormalDNDCharacterAtributesMock.agi = 3;
      paranormalDNDCharacterAtributesMock.vig = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.flee.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(7);
         expect(rollResult.value).toBeLessThanOrEqual(26);
      }
   });

   it('Rolling a "Esquivar" dice should generate a number between 1 and 14 when "Agility" is 0 and "Strength" is 3.', () => {
      paranormalDNDCharacterAtributesMock.agi = 0;
      paranormalDNDCharacterAtributesMock.vig = 3;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.flee.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(14);
      }
   });

   it('Rolling a "Esquivar" dice should generate a number between 3 and 22 when "Agility" is 3 and "Strength" is 2.', () => {
      paranormalDNDCharacterAtributesMock.agi = 3;
      paranormalDNDCharacterAtributesMock.vig = 2;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.flee.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(3);
         expect(rollResult.value).toBeLessThanOrEqual(22);
      }
   });

   it('Rolling a "Aparar" dice should generate a number between 1 and 20 when "Dexterity" is 0.', () => {
      paranormalDNDCharacterAtributesMock.dex = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.parry.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a "Aparar" dice should generate a number between 4 and 23 when "Dexterity" is 3.', () => {
      paranormalDNDCharacterAtributesMock.dex = 3;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.parry.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(4);
         expect(rollResult.value).toBeLessThanOrEqual(23);
      }
   });

   it('Rolling a "Aparar e Revidar" dice should generate a number between 1 and 10 when "Dexterity" is 0.', () => {
      paranormalDNDCharacterAtributesMock.dex = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.parryCounter.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(10);
      }
   });

   it('Rolling a "Aparar e Revidar" dice should generate a number between 7 and 16 when "Dexterity" is 3.', () => {
      paranormalDNDCharacterAtributesMock.dex = 3;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.parryCounter.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(7);
         expect(rollResult.value).toBeLessThanOrEqual(16);
      }
   });

   it('Rolling a "Furtividade" dice should generate a number between 1 and 20 when "Dexterity" is 0.', () => {
      paranormalDNDCharacterAtributesMock.dex = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.stealth.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a "Furtividade" dice should generate a number between 4 and 23 when "Dexterity" is 3.', () => {
      paranormalDNDCharacterAtributesMock.dex = 3;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.stealth.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(4);
         expect(rollResult.value).toBeLessThanOrEqual(23);
      }
   });

   it('Rolling a "Reanimar" dice should generate a number between 1 and 20 when "Inteligence" is 0.', () => {
      paranormalDNDCharacterAtributesMock.int = 0;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.reanimate.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(1);
         expect(rollResult.value).toBeLessThanOrEqual(20);
      }
   });

   it('Rolling a "Reanimar" dice should generate a number between 6 and 25 when "Inteligence" is 3.', () => {
      paranormalDNDCharacterAtributesMock.int = 3;
      for(let i = 0; i < repeatRollTestTimes; i++){
         const rollResult = paranormalDNDDices.dicesFormulas.reanimate.roll(paranormalDNDCharacterAtributesMock);
         expect(rollResult.value).toBeGreaterThanOrEqual(6);
         expect(rollResult.value).toBeLessThanOrEqual(25);
      }
   });
});
