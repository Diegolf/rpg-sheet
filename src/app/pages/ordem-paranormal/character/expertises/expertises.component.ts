import { ordemParanormalExpertises } from './../../../../../models/characters/ordem-paranormal-character/expertises';
import { GameService } from './../../../../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ordem-paranormal-expertises',
   templateUrl: './expertises.component.html',
   styleUrls: ['./expertises.component.scss'],
})
export class OPExpertisesComponent implements OnInit {

   expertisesInfo = [];

   constructor(private gameSerivce: GameService) {
      this.loadExpertisesInfo();
   }

   ngOnInit() { }

   loadExpertisesInfo() {
      this.expertisesInfo = ordemParanormalExpertises.sort((expertiseA, expertiseB) => expertiseA.name.localeCompare(expertiseB.name));
   }

}
