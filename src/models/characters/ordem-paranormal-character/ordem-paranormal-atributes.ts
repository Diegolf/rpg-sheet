import { CharacterAtributes, CharacterAtributeInfo } from './../character';

export enum OrdemParanormalAtributesCodes {
   agilidade = 'agi',
   forca = 'for',
   intelecto = 'int',
   presenca = 'pre',
   vigor = 'vig'
}

export interface OrdemParanormalCharacterAtributes extends CharacterAtributes {
   [OrdemParanormalAtributesCodes.agilidade]: number;
   [OrdemParanormalAtributesCodes.forca]: number;
   [OrdemParanormalAtributesCodes.intelecto]: number;
   [OrdemParanormalAtributesCodes.presenca]: number;
   [OrdemParanormalAtributesCodes.vigor]: number;
}

export const ordemParanormalCharacterAtributesInfo: CharacterAtributeInfo[] = [
   {
      code: 'agi',
      name: 'Agilidade',
      description: 'Equilíbrio, precisão, coordenação motora e velocidade de reação. Em combate, afeta seus ataques com armas à'+
         'distância, sua Iniciativa (que determina a ordem em que os personagens dos jogadores agem) e também seus testes de Reflexos,'+
         'importante para situações em que precisa se desviar de algum perigo. Alguém com um valor alto em Agilidade tem reflexos rápidos'+
         'e precisão aguçada.'
   },
   {
      code: 'for',
      name: 'Força',
      description: 'Potência muscular e habilidade atlética geral. Esse atributo vai influenciar testes relacionados com sua proeza'+
         'física, além de afetar seus ataques corpo-a-corpo. Um personagem com Força alta tem grande capacidade física, seja por'+
         'treinamento constante, modificação mágica ou predisposição genética'
   },
   {
      code: 'int',
      name: 'Intelecto',
      description: 'Rapidez de raciocínio, memória, capacidade de resolução de problemas e conhecimento geral de um'+
         'personagem. O Intelecto determina a quantidade de perícias em que o personagem é Treinado. Também afeta'+
         'sua compreensão do Outro Lado e sua capacidade de racionalizar o paranormal, definindo o número de Rituais'+
         'que você pode aprender. Uma pessoa com Intelecto elevado tem raciocínio rápido e afiado, conhecimento amplo'+
         'sobre diversos assuntos e habilidades que envolvem estudo, como conhecimento científico.'
   },
   {
      code: 'pre',
      name: 'Presença',
      description: 'Habilidades sociais e resiliência mental-emocional. Um personagem com valor alto de Presença sabe'+
         'como usar bem as palavras para conduzir a conversa a seu favor usando de uma excelente lábia, e também é'+
         'perspicaz e difícil de enganar. Pode ser mais descolado e brincalhão, ou sério e resoluto. Presença também'+
         'afeta sua Vontade, que determina sua resiliência mental para lidar com stress e o Paranormal, além de'+
         'conceder Pontos de Esforço adicionais por Nível de Exposição (NEX).'
   },
   {
      code: 'vig',
      name: 'Vigor',
      description: 'Resiliência física, afetando seus Pontos de Vida (PV) e também seus testes de Fortitude. Quanto mais alto'+
         'seu Vigor, mais resistente e duro você será, sendo capaz de aguentar mais ferimentos antes de cair inconsciente'
   },
];
