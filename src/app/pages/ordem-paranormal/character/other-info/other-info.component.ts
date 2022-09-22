import { GameService } from './../../../../services/game.service';
import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
   selector: 'app-other-ordem-paranormal-info',
   templateUrl: './other-info.component.html',
   styleUrls: ['./other-info.component.scss'],
})
export class OtherOPInfoComponent implements OnInit, OnDestroy {

   public model = {
      imageUrl: '',
      name: ''
   };

   constructor(public modalCtrl: ModalController, public gameService: GameService) {
      this.model = {
         imageUrl: this.gameService.character.imageUrl,
         name: this.gameService.character.name
      };
   }

   ngOnInit() {
   }

   ngOnDestroy() {
      const changes = [];

      if (this.model.imageUrl !== this.gameService.character.imageUrl) {
         this.gameService.character.imageUrl = this.model.imageUrl;
         changes.push('imageUrl');
      }

      if (this.model.name !== this.gameService.character.name) {
         this.gameService.character.name = this.model.name;
         changes.push('name');
      }

      if (changes.length > 0) {
         this.gameService.saveCharacterConfig(changes);
      }
   }

}
