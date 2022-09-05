import { OrdemParanormalAtributesCodes } from './atributes';

export enum OrdemParanormalExpertisesCodes {
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
   artes = 28
}

export enum OrdemParanormalExpertiseInfoCodes {
   destreinado = 0,
   treinado = 1,
   veterano = 2,
   expert = 3
}

export interface OrdemParanormalExpertiseInfo {
   code: number;
   value: number;
   text: string;
}

export const ordemParanormalExpertiseValueList: OrdemParanormalExpertiseInfo[] = [
   {
      text:'Destreinado',
      code: OrdemParanormalExpertiseInfoCodes.destreinado,
      value: 0,
   },
   {
      text:'Treinado',
      code: OrdemParanormalExpertiseInfoCodes.treinado,
      value: 5,
   },
   {
      text:'Veterano',
      code: OrdemParanormalExpertiseInfoCodes.veterano,
      value: 10,
   },
   {
      text:'Expert',
      code: OrdemParanormalExpertiseInfoCodes.expert,
      value: 15,
   },
];

export interface OrdemParanormalExpertise {
   code: OrdemParanormalExpertisesCodes;
   name: string;
   description: string;
   afectedByAtributes: OrdemParanormalAtributesCodes[];
   onlyTreined: boolean;
   weightPenalty: boolean;
}

export const ordemParanormalExpertises: OrdemParanormalExpertise[] = [
   {
      code: OrdemParanormalExpertisesCodes.acrobacia,
      name: 'Acrobacia',
      description: 'Você consegue fazer proezas acrobáticas. (Amortecer Queda, Equilíbrio, Escapar, Levantar-se Rapidamente, '+
         'Passar por Espaço Apertado, Passar por Inimigo)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: false,
      weightPenalty: true,
   },
   {
      code: OrdemParanormalExpertisesCodes.adestramento,
      name: 'Adestramento',
      description: 'Você sabe lidar com animais. (Acalmar animal, Cavalgar, Manejar Animal)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.atletismo,
      name: 'Atletismo',
      description: 'Você pode realizar façanhas atléticas. (Corrida, Escalar, Natação, Saltar)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.forca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.atualidades,
      name: 'Atualidades',
      description: 'ocê é um conhecedor de assuntos gerais, como política, esporte e entretenimento, '+
         'e pode responder dúvidas relativas a esses assuntos.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.ciencias,
      name: 'Ciências',
      description: 'Você estudou diversos campos científicos, como matemática, física, química e biologia, '+
         'e pode responder dúvidas relativas a esses assuntos.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.crime,
      name: 'Crime',
      description: 'Você sabe exercer atividades ilícitas. (Arrombar, Furto, Ocultar, Sabotar)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: true,
      weightPenalty: true,
   },
   {
      code: OrdemParanormalExpertisesCodes.diplomacia,
      name: 'Diplomacia',
      description: 'Você convence pessoas com lábia e argumentação. (Acalmar, Mudar Atitude, Persuasão)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.enganacao,
      name: 'Enganação',
      description: 'Você manipula pessoas com blefes e trapaças. (Disfarce, Falsificação, Fintar, Insinuação, Intriga, Mentir)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.fortitude,
      name: 'Fortitude',
      description: 'Você usa esta perícia para testes de resistência contra efeitos que exigem vitalidade, como doenças e venenos.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.vigor],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.furtividade,
      name: 'Furtividade',
      description: 'Você sabe ser discreto e sorrateiro. (Esconder-se, Seguir)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: false,
      weightPenalty: true,
   },
   {
      code: OrdemParanormalExpertisesCodes.iniciativa,
      name: 'Iniciativa',
      description: 'Esta perícia determina sua velocidade de reação. Quando uma cena de ação começa, '+
         'cada personagem envolvido faz um teste de Iniciativa.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.intimidacao,
      name: 'Intimidação',
      description: 'Você pode assustar ou coagir outras pessoas. Todos os usos de Intimidação são efeitos de '+
         'medo. (Assustar, Coagir)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.intuicao,
      name: 'Intuição',
      description: 'Esta perícia mede sua empatia e “sexto sentido”. (Perceber Mentira, Pressentimento)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.investigacao,
      name: 'Investigação',
      description: 'Você sabe como descobrir pistas e informações. (Interrogar, Procurar)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.luta,
      name: 'Luta',
      description: 'Você usa Luta para fazer ataques corpo a corpo. A DT é a Defesa do alvo.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.forca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.medicina,
      name: 'Medicina',
      description: 'Você sabe tratar ferimentos, doenças e venenos. (Primeiros Socorros, Cuidados Prolongados, '+
         'Necropsia, Tratamento)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.ocultismo,
      name: 'Ocultismo',
      description: 'Você estudou o Paranormal. (Identificar Criatura, Identificar Item Amaldiçoado, Identificar'+
         'Ritual, Informação)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.percepcao,
      name: 'Percepção',
      description: 'Você nota coisas usando os sentidos. (Observar, Ouvir)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.pilotagem,
      name: 'Pilotagem',
      description: 'Você sabe operar veículos terrestres e aquáticos, como motos, carros e lanchas.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.pontaria,
      name: 'Pontaria',
      description: 'Você usa Pontaria para fazer ataques à distância. A DT é a Defesa do alvo.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.profissao,
      name: 'Profissão',
      description: 'Você sabe exercer uma profissão específica, como advogado, engenheiro, jornalista '+
         'ou publicitário. Converse com o mestre para definir os detalhes de sua profissão e que tipos '+
         'de testes você pode fazer com ela. ',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.reflexos,
      name: 'Reflexos',
      description: 'Você usa esta perícia para testes de resistência contra efeitos que exigem reação rápida'+
         ', como armadilhas e explosões.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.agilidade],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.religiao,
      name: 'Religião',
      description: 'Você possui conhecimento sobre teologia e as diversas religiões do mundo. (Acalmar, '+
         'Informação, Rito)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.sobrevivencia,
      name: 'Sobrevivência',
      description: 'Você pode se guiar em regiões selvagens e evitar perigos da natureza. (Acampamento, '+
         'Identificar Animal, Orientar-se, Rastrear)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.tatica,
      name: 'Tática',
      description: 'Você recebeu educação militar. (Analisar Terreno, Plano de Ação)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.tecnologia,
      name: 'Tecnologia',
      description: 'Você possui conhecimentos avançados de eletrônica e informática. (Falsificação, Hacker, '+
         'Localizar Arquivo, Operar Dispositivo)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.intelecto],
      onlyTreined: true,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.vontade,
      name: 'Vontade',
      description: 'Você usa esta perícia para testes de resistência contra efeitos que exigem determinação'+
         ', como intimidação e rituais que afetam a mente.',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: false,
      weightPenalty: false,
   },
   {
      code: OrdemParanormalExpertisesCodes.artes,
      name: 'Artes',
      description: 'Você sabe se expressar com diversas formas de arte, como música, dança, escrita, pintura, '+
         'atuação e outras. (Impressionar)',
      afectedByAtributes: [OrdemParanormalAtributesCodes.presenca],
      onlyTreined: true,
      weightPenalty: false,
   },
];

export const ordemParanormalExpertisesObject = ordemParanormalExpertises.reduce((acc, exp) => ({...acc, [exp.code]: exp}), {});

