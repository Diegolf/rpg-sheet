export enum OrdemParanormalClassesCodes {
   combatente = 1,
   especialista = 2,
   ocultista = 3
}

export interface OrdemParanormalClass {
   code: OrdemParanormalClassesCodes;
   name: string;
   description: string;

   calculateHealthPoints: (vigor: number, nex: number) => number;
   calculateEffortPoints: (presenca: number, nex: number) => number;
   calculateSanity: (nex: number) => number;
}

export const ordemParanormalClasses: OrdemParanormalClass[] = [
   {
      name: 'Combatente',
      description: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de '+
         'frente, É o tipo de agente que prefere abordagens mais diretas e costuma atirar primeiro e perguntar depois.',
      code: OrdemParanormalClassesCodes.combatente,
      calculateHealthPoints: (vigor: number, nex: number) => (20 + vigor + ((4 + vigor) * nex)),
      calculateEffortPoints: (presenca: number, nex: number) => (2 + presenca + ((2 + presenca) * nex)),
      calculateSanity: (nex: number) => (12 + (3 * nex))
   },
   {
      name: 'Especialista',
      description: 'Um agente que confia mais em esperteza do que em força bruta. Um especialista se vale de conhecimento '+
         'técnico, raciocínio rápido ou mesmo lábia para resolver mistérios e enfrentar o paranormal.',
      code: OrdemParanormalClassesCodes.especialista,
      calculateHealthPoints: (vigor: number, nex: number) => (16 + vigor + ((3 + vigor) * nex)),
      calculateEffortPoints: (presenca: number, nex: number) => (3 + presenca + ((3 + presenca) * nex)),
      calculateSanity: (nex: number) => (16 + (4 * nex))
   },
   {
      name: 'Ocultista',
      description: 'O Outro Lado é misterioso, perigoso e, de certa forma, cativante. Muitos estudiosos das entidades '+
         'se perdem em seus reinos obscuros em busca de poder, mas existem aqueles que visam compreender e dominar os '+
         'mistérios paranormais para usá-los para combater o próprio Outro Lado. Esse tipo de agente não é apenas um '+
         'conhecedor do oculto, como também possui talento para se conectar com elementos paranormais.',
      code: OrdemParanormalClassesCodes.ocultista,
      calculateHealthPoints: (vigor: number, nex: number) => (12 + vigor + ((2 + vigor) * nex)),
      calculateEffortPoints: (presenca: number, nex: number) => (4 + presenca + ((4 + presenca) * nex)),
      calculateSanity: (nex: number) => (20 + (4 * nex))
   },
];
