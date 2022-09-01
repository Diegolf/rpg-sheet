import { OrdemParanormalExpertisesCodes } from './ordem-paranormal-expertises';

export enum OrdemParanormalOriginCodes {
   academico = 1,
   agenteDeSaude = 2,
   amnesico = 3,
   artista = 4,
   atleta = 5,
   chef = 6,
   criminoso = 7,
   cultistaArrependido = 8,
   desgarrado = 9,
   engenheiro = 10,
   executivo = 11,
   investigador = 12,
   lutador = 13,
   magnata = 14,
   mercenario = 15,
   militar = 16,
   operario = 17,
   policial = 18,
   religioso = 19,
   servidorPublico = 20,
   teoricoDaConspiracao = 21,
   ti = 22,
   trabalhadorRural = 23,
   trambiqueiro = 24,
   universitario = 25,
   vitima = 26
}

export interface OrdemParanormalOrigin {
   code: OrdemParanormalOriginCodes;
   name: string;
   description: string;
   expertises: OrdemParanormalExpertisesCodes[];
   // skills: string[];
}

export const ordemParanormalOrigins: OrdemParanormalOrigin[] = [
   {
      code: OrdemParanormalOriginCodes.academico,
      name: 'Acadêmico',
      description: 'Você era um pesquisador ou professor universitário. De forma proposital ou não,'+
         'seus estudos tocaram em assuntos misteriosos e chamaram a atenção da Ordo Realitas.',
      expertises: [OrdemParanormalExpertisesCodes.ciencias, OrdemParanormalExpertisesCodes.investigacao],
   },
   {
      code: OrdemParanormalOriginCodes.agenteDeSaude,
      name: 'Agente de Saúde',
      description: 'Você era um profissional da saúde como um enfermeiro, farmacêutico, médico, psicólogo ou'+
         'socorrista, treinado no atendimento e cuidado de pessoas. Você pode ter sido surpreendido por um evento'+
         'paranormal durante o trabalho ou mesmo cuidado de um agente da Ordem em uma emergência, que ficou surpreso'+
         'com o quão bem você lidou com a situação.',
      expertises: [OrdemParanormalExpertisesCodes.intuicao, OrdemParanormalExpertisesCodes.medicina],
   },
   {
      code: OrdemParanormalOriginCodes.amnesico,
      name: 'Amnésico',
      description: 'Você perdeu a maior parte da memória. Sabe apenas o próprio nome, ou nem isso. Sua amnésia'+
         'pode ser resultado de um trauma paranormal ou mesmo de um ritual. Talvez você tenha sido vítima de'+
         'cultistas? Talvez você tenha sido um cultista? Seja como for, hoje a Ordem é a única família que conhece.'+
         'Quem sabe, cumprindo missões, você descubra algo sobre seu passado.',
      expertises: [],
   },
   {
      code: OrdemParanormalOriginCodes.artista,
      name: 'Artista',
      description: 'Você era um ator, músico, escritor, dançarino, influenciador... Seu trabalho pode ter sido'+
         'inspirado por uma experiência paranormal do passado e o que o público acha que é pura criatividade, a'+
         'Ordem sabe que tem um lado mais sombrio.',
      expertises: [OrdemParanormalExpertisesCodes.artes, OrdemParanormalExpertisesCodes.enganacao],
   },
   {
      code: OrdemParanormalOriginCodes.atleta,
      name: 'Atleta',
      description: 'Você competia em um esporte individual ou por equipe, como natação ou futebol. Seu alto'+
         'desempenho pode ser fruto de alguma influência paranormal que nem mesmo você conhecia ou você pode'+
         'ter se envolvido em algum evento paranormal em uma de suas competições.',
      expertises: [OrdemParanormalExpertisesCodes.acrobacia, OrdemParanormalExpertisesCodes.atletismo],
   },
   {
      code: OrdemParanormalOriginCodes.chef,
      name: 'Chef',
      description: 'Você é um cozinheiro amador ou profissional. Talvez trabalhasse em um restaurante, talvez'+
         'simplesmente gostasse de cozinhar para a família e amigos. Como sua comida fez com que você se envolvesse'+
         'com o paranormal? Ninguém sabe. Mas os outros agentes adoram quando você vai para a missão!',
      expertises: [OrdemParanormalExpertisesCodes.fortitude, OrdemParanormalExpertisesCodes.profissao],
   },
   {
      code: OrdemParanormalOriginCodes.criminoso,
      name: 'Criminoso',
      description: 'Você vivia uma vida fora da lei, seja como mero batedor de carteiras, seja como membro de'+
         'uma facção criminosa. Em algum momento, você se envolveu em um assunto da Ordem talvez tenha roubado'+
         'um item amaldiçoado? A organização, por sua vez, achou melhor recrutar seus talentos do que ter você'+
         'como um estorvo.',
      expertises: [OrdemParanormalExpertisesCodes.crime, OrdemParanormalExpertisesCodes.furtividade],
   },
   {
      code: OrdemParanormalOriginCodes.cultistaArrependido,
      name: 'Cultista Arrependido',
      description: 'Você fez parte de um culto paranormal. Talvez fossem ignorantes iludidos, que acreditavam'+
         'estar contatando entidades benevolentes. Talvez soubessem exatamente o que estavam fazendo. Seja como'+
         'for, algo abriu seus olhos e agora você luta pelo lado certo — embora carregue para sempre traços de'+
         'sua vida pregressa. Outros membros da Ordem podem desconfiar de sua conversão e você sabe que precisará'+
         'se esforçar para conquistar a confiança de todos.',
      expertises: [OrdemParanormalExpertisesCodes.ocultismo, OrdemParanormalExpertisesCodes.religiao],
   },
   {
      code: OrdemParanormalOriginCodes.desgarrado,
      name: 'Desgarrado',
      description: 'Você não vivia de acordo com as normas da sociedade. Podia ser um eremita, uma pessoa em'+
         'situação de rua ou simplesmente alguém que descobriu o Paranormal e abandonou sua rotina — sabendo o'+
         'quão frágil era a existência humana, não conseguia simplesmente continuar indo para o trabalho todo'+
         'o dia. De qualquer forma, a vida sem os confortos modernos o deixou mais forte.',
      expertises: [OrdemParanormalExpertisesCodes.fortitude, OrdemParanormalExpertisesCodes.sobrevivencia],
   },
   {
      code: OrdemParanormalOriginCodes.engenheiro,
      name: 'Engenheiro',
      description: 'Enquanto os acadêmicos estão preocupados com teorias, você colocar a mão na massa, seja como'+
         'engenheiro profissional, seja como inventor de garagem. Provavelmente você criou algum dispositivo'+
         'paranormal que chamou a atenção da Ordem.',
      expertises: [OrdemParanormalExpertisesCodes.profissao, OrdemParanormalExpertisesCodes.tecnologia],
   },
   {
      code: OrdemParanormalOriginCodes.executivo,
      name: 'Executivo',
      description: 'Você possuía um trabalho de escritório em uma grande empresa, banco ou corporação. Era um'+
         'administrador, advogado, contador ou de qualquer outra profissão que lida com papelada e burocracia.'+
         'Sua vida era bastante normal, até que você descobriu algo que não devia. Talvez o sucesso da empresa'+
         'residisse em um ritual? Talvez toda a corporação fosse fachada para um culto e o presidente, um líder'+
         'cultista envolvido com entidades paranormais? Após essa descoberta, você foi recrutado pela Ordem e'+
         'trocou seu trabalho de escritório por missões de campo — hoje, sua vida é tudo, menos normal.',
      expertises: [OrdemParanormalExpertisesCodes.diplomacia, OrdemParanormalExpertisesCodes.profissao],
   },
   {
      code: OrdemParanormalOriginCodes.magnata,
      name: 'Magnata',
      description: 'Você possui muito dinheiro ou patrimônio. Pode ser o herdeiro de uma família antiga ligada'+
         'ao oculto, ter criado e vendido uma empresa e decidido usar sua riqueza para uma causa maior, ou ter'+
         'ganho uma loteria após inadvertidamente escolher números amaldiçoados que formavam um ritual.',
      expertises: [OrdemParanormalExpertisesCodes.diplomacia, OrdemParanormalExpertisesCodes.pilotagem],
   },
   // {
   //    code: OrdemParanormalOriginCodes.mercenario,
   //    name: 'Mercenário',
   //    description: '',
   //    expertises: [OrdemParanormalExpertisesCodes., OrdemParanormalExpertisesCodes.],
   // },
   // {
   //    code: OrdemParanormalOriginCodes.,
   //    name: '',
   //    description: '',
   //    expertises: [OrdemParanormalExpertisesCodes., OrdemParanormalExpertisesCodes.],
   // },
];
