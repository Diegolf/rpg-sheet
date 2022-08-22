export enum OrdemParanormalCharacterExpertiseCodes {
   acrobacia = 1,
   adestramento = 2,
   atletismo = 3,
   atualidades = 4,
   ciencias = 5,
   crime = 6,
   diplomacia = 7,
   enganacao = 8,
   fortitude = 9,
   furtividade = 10,
   iniciativa = 11,
   intimidacao = 12,
   intuicao = 13,
   investigacao = 14,
   luta = 15,
   medicina = 16,
   ocultismo = 17,
   percepcao = 18,
   pilotagem = 19,
   pontaria = 20,
   profissao = 21,
   reflexos = 22,
   religiao = 23,
   sobrevivencia = 24,
   tatica = 25,
   tecnologia = 26,
   vontade = 27,
}

export interface OrdemParanormalCharacterExpertise {
   code: OrdemParanormalCharacterExpertiseCodes;
   name: string;
   description: string;
   modifier: number;
   onlyTreined: boolean;
   weightPenalty: boolean;
}

export const ordemParanormalCharacterExpertise: OrdemParanormalCharacterExpertise[] = [
   {
      code: OrdemParanormalCharacterExpertiseCodes.acrobacia,
      name: 'Acrobacia',
      description: 'Você consegue fazer proezas acrobáticas. (Amortecer Queda, Equilíbrio, Escapar, Levantar-se Rapidamente,'+
         'Passar por Espaço Apertado, Passar por Inimigo)',
      modifier: 0,
      onlyTreined: false,
      weightPenalty: true,
   },
];
