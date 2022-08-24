export enum OrdemParanormalClassesCodes {
   combatente = 1,
   especialista = 2,
   ocultista = 3
}

export interface OrdemParanormalClass {
   code: OrdemParanormalClassesCodes;
   name: string;

   calculateHealthPoints: (vigor: number, nex: number) => number;
   calculateEffortPoints: (presenca: number, nex: number) => number;
   calculateSanity: (nex: number) => number;
}

export const ordemParanormalClasses: OrdemParanormalClass[] = [
   {
      name: 'Combatente',
      code: OrdemParanormalClassesCodes.combatente,
      calculateHealthPoints: (vigor: number, nex: number) => (20 + vigor + ((4 + vigor) * nex)),
      calculateEffortPoints: (presenca: number, nex: number) => (2 + presenca + ((2 + presenca) * nex)),
      calculateSanity: (nex: number) => (12 + (3 * nex))
   },
   {
      name: 'Especialista',
      code: OrdemParanormalClassesCodes.especialista,
      calculateHealthPoints: (vigor: number, nex: number) => (16 + vigor + ((3 + vigor) * nex)),
      calculateEffortPoints: (presenca: number, nex: number) => (3 + presenca + ((3 + presenca) * nex)),
      calculateSanity: (nex: number) => (16 + (4 * nex))
   },
   {
      name: 'Ocultista',
      code: OrdemParanormalClassesCodes.ocultista,
      calculateHealthPoints: (vigor: number, nex: number) => (12 + vigor + ((2 + vigor) * nex)),
      calculateEffortPoints: (presenca: number, nex: number) => (4 + presenca + ((4 + presenca) * nex)),
      calculateSanity: (nex: number) => (20 + (4 * nex))
   },
];
