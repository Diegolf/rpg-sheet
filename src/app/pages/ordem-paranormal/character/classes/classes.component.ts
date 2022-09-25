import { OrdemParanormalCharacterConfigData } from 'src/models/characters/ordem-paranormal-character/character';
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
      const characterData = this.gameService.character as OrdemParanormalCharacter;
      characterData.changeClass(opClass);
      this.gameService.saveCharacterConfig(['characterClass']);
   }

   private loadClassesList() {
      this.opClassesList = ordemParanormalClasses;
      this.currentClassCode = (this.gameService.character as OrdemParanormalCharacter).characterClass.code;
   }

}
