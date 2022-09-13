import { OrdemParanormalCharacter } from './../../../../../models/characters/ordem-paranormal-character/character';
import { ordemParanormalCharacterAtributesInfoObject } from './../../../../../models/characters/ordem-paranormal-character/atributes';
import {
   ordemParanormalExpertises,
   ordemParanormalExpertiseValueList
} from './../../../../../models/characters/ordem-paranormal-character/expertises';
import { GameService } from './../../../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ordem-paranormal-expertises',
   templateUrl: './expertises.component.html',
   styleUrls: ['./expertises.component.scss'],
})
export class OPExpertisesComponent implements OnInit {

   public expertisesList = [];
   public expertiseValueList;

   private expertisesInfo = [];

   constructor(private gameService: GameService) {
      this.loadExpertisesValueListInfo();
      this.loadExpertisesInfo();
   }

   ngOnInit() { }

   /** Filtra a lista de perícias de acordo com o texto informado */
   filterExpertises(event) {

      // Texto informado
      const filtro = event.detail.value;
      if (filtro) {
         this.expertisesList = this.expertisesInfo.filter(ei =>

            // Utiliza toLowerCase para fazer um filtro case insensitivo
            ei.name.toLowerCase().includes(filtro) || ei.description.toLowerCase().includes(filtro)
         );
      }
      else {
         // Se o filtro for apagado retorna a lista completa
         this.expertisesList = this.expertisesInfo;
      }
   }

   /** Modifica o valor de uma perícia */
   changeExpertiseValue(event, expertise) {

      // Valor selecionado (0, 5, 10 ou 15)
      const selectedValue = this.expertiseValueList.find(expertiseValue => expertiseValue.code === event.detail.value);

      // Altera o valor exibido em tela de acordo
      expertise.currentValueText = selectedValue.value > 0 ? ('+' + selectedValue.value) : selectedValue.value;

      // Altera a classe do texto exibido em tela
      expertise.currentValueClass = selectedValue.valueClass;

      // Altera o valor no personagem
      (this.gameService.character as OrdemParanormalCharacter).changeExpertise(expertise.code, selectedValue.code);
   }

   /** Carrega a lista de perícias formatando os textos */
   private loadExpertisesValueListInfo() {
      this.expertiseValueList = ordemParanormalExpertiseValueList.map(ev => {
         // Concatena o texto com o valor em parentêsis "Treinado (+5)"
         const text = `${ev.text}${ev.value > 0 ? ' (+' + ev.value + ')' : ''}`;

         // Seta as classes css relativas a cada valor
         const valueClass = `expertise-${ev.text.toLowerCase()}`;

         // Retorna um novo objeto para manter o objeto principal sem as formatações especiais da tela
         return {...ev, text, valueClass};
      });
   }

   /** Carrega a lista de perícias com alguns campos formatados e de acordo com as perícias atuais do personagem */
   private loadExpertisesInfo() {

      // Lista de perícias do personagem
      const characterExpertises = (this.gameService.character as OrdemParanormalCharacter).expertises;

      this.expertisesInfo = ordemParanormalExpertises
         // Ordena a lista por nome
         .sort((expertiseA, expertiseB) => expertiseA.name.localeCompare(expertiseB.name))
         .map(expertise => {
            // Lista de informações de modificadores (AT: Apenas Treinado; PC: Penalidade de Carga)
            const modifiers = [expertise.onlyTreined && 'AT', expertise.weightPenalty && 'PC'].filter(e => e).join(', ');

            // Nome dos atributos relacionados à perícia concatenados
            const atributes = expertise.afectedByAtributes
               .map(expertiseAffectedAtribute => ordemParanormalCharacterAtributesInfoObject[expertiseAffectedAtribute].name)
               .join(', ');

            // Nome da perícia formatado: Nome (Atributos relacionados) (Modificadores)
            const name = `${expertise.name}${atributes ? ' (' + atributes + ')' : ''}${modifiers ? ' (' + modifiers + ')' : ''}`;

            // Informações do valor atual desta perícia para o personagem
            const characterExpetiseInfo = characterExpertises.find(characterExpertise => characterExpertise.code === expertise.code);
            const currentValue = this.expertiseValueList
               .find(ev => ev.code === characterExpetiseInfo?.info.code) || this.expertiseValueList[0];

            // Texto fomatado a ser exibido para a perícia atual: 0, +5, ...
            const currentValueText = currentValue.value > 0 ? ('+' + currentValue.value) : currentValue.value;

            return {
               ...expertise, name, currentValueText, currentValueCode: currentValue.code, currentValueClass: currentValue.valueClass
            };
         });
      this.expertisesList = this.expertisesInfo;
   }

}
