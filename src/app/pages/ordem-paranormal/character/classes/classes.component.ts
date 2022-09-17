import { OrdemParanormalCharacter } from './../../../../../models/characters/ordem-paranormal-character/character';
import { ordemParanormalClasses, OrdemParanormalClass } from './../../../../../models/characters/ordem-paranormal-character/classes';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ordem-paranormal-classes',
   templateUrl: './classes.component.html',
   styleUrls: ['./classes.component.scss'],
})
export class OPClassesComponent implements OnInit {

   public opClassesList = [];
   public currentClassCode;

   constructor(private gameService: GameService) {
      this.loadClassesList();
   }

   ngOnInit() { }

   changeCharacterClass(opClass: OrdemParanormalClass) {
      this.currentClassCode = opClass.code;
      (this.gameService.character as OrdemParanormalCharacter).changeClass(opClass);
   }

   private loadClassesList() {
      this.opClassesList = ordemParanormalClasses;
      this.currentClassCode = (this.gameService.character as OrdemParanormalCharacter).characterClass.code;
   }

}
