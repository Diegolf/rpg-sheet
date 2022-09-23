import { OrdemParanormalCharacter } from './../../../models/characters/ordem-paranormal-character/character';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
   selector: 'app-ordem-paranormal-layout',
   templateUrl: './layout.component.html',
   styleUrls: ['./layout.component.scss'],
})
export class OPLayoutComponent implements OnInit {

   public rotas = [
      { routerLink: '/pages/character', titulo: 'Personagem', icon:'person' },
      { routerLink: '/pages/dices', titulo: 'Dados', icon:'dice' },
      { routerLink: '/pages/inventory', titulo: 'Inventário', icon:'file-tray-full' },
   ];

   public otherInfoModel = {
      imageUrl: '',
      name: ''
   };

   constructor(
      public gameService: GameService,
      private alertController: AlertController,
      private modalCtrl: ModalController
   ) { }

   ngOnInit() {
      this.otherInfoModel = {
         imageUrl: this.gameService.character.imageUrl,
         name: this.gameService.character.name
      };
   }

   otherInfoWillDismiss() {
      const changes = [];

      if (this.otherInfoModel.imageUrl !== this.gameService.character.imageUrl) {
         this.gameService.character.imageUrl = this.otherInfoModel.imageUrl;
         changes.push('imageUrl');
      }

      if (this.otherInfoModel.name !== this.gameService.character.name) {
         this.gameService.character.name = this.otherInfoModel.name;
         changes.push('name');
      }

      if (changes.length > 0) {
         this.gameService.saveCharacterConfig(changes);
      }
   }

   async openCodeInput() {
      const alert = await this.alertController.create({
         mode: 'ios',
         header: '?',
         inputs: [
            {
               name: 'code',
               placeholder: '*******',
               cssClass: 'ion-text-center'
            },
         ],
         buttons: [
            {
               text: 'OK',
               handler: (data) => {
                  // TODO
               }
            }
         ],
      });

      await alert.present();
   }

   changeHealthByAmout(value: number) {
      this.gameService.character.changeHealthByAmout(value);
      this.gameService.saveCharacterConfig(['healthPoints']);
   }

   changeSanityByAmount(value: number) {
      (this.gameService.character as OrdemParanormalCharacter).changeSanityByAmount(value);
      this.gameService.saveCharacterConfig(['sanity']);
   }

   changeEffortByamout(value: number) {
      (this.gameService.character as OrdemParanormalCharacter).changeEffortByamout(value);
      this.gameService.saveCharacterConfig(['ep']);
   }

}
