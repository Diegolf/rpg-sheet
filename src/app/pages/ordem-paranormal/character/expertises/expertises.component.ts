import { OrdemParanormalCharacter } from './../../../../../models/characters/ordem-paranormal-character/character';
import { ordemParanormalCharacterAtributesInfoObject } from './../../../../../models/characters/ordem-paranormal-character/atributes';
import { ordemParanormalExpertises } from './../../../../../models/characters/ordem-paranormal-character/expertises';
import { GameService } from './../../../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ordem-paranormal-expertises',
   templateUrl: './expertises.component.html',
   styleUrls: ['./expertises.component.scss'],
})
export class OPExpertisesComponent implements OnInit {

   public expertisesList = [];

   private expertisesInfo = [];

   constructor(private gameService: GameService) {
      this.loadExpertisesInfo();
   }

   ngOnInit() { }

   filterExpertises(event) {
      const filtro = event.detail.value;
      if (filtro) {
         this.expertisesList = this.expertisesInfo.filter(ei =>
            ei.name.toLowerCase().includes(filtro)
            || ei.description.toLowerCase().includes(filtro)
         );
      }
      else {
         this.expertisesList = this.expertisesInfo;
      }
   }

   private loadExpertisesInfo() {
      const characterExpertises = (this.gameService.character as OrdemParanormalCharacter).expertises;
      this.expertisesInfo = ordemParanormalExpertises
         .sort((expertiseA, expertiseB) => expertiseA.name.localeCompare(expertiseB.name))
         .map(expertise => {
            const modifiers = [expertise.onlyTreined && 'AT', expertise.weightPenalty && 'PC'].filter(e => e).join(', ');
            const atributes = expertise.afectedByAtributes.map(eaa => ordemParanormalCharacterAtributesInfoObject[eaa].name).join(', ');
            expertise.name = `${expertise.name}${atributes ? ' ('+atributes+')' : ''}${modifiers ? ' ('+modifiers+')' : ''}`;
            const characterExpetiseInfo = characterExpertises.find(ce => ce.code === expertise.code);

            return {...expertise, currentValue: (characterExpetiseInfo?.info.code || 0)};
         });
      this.expertisesList = this.expertisesInfo;
   }

}
