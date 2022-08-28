import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
   selector: 'app-layout',
   templateUrl: './layout.component.html',
   styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

   public rotas = [
      { routerLink: '/pages/character', titulo: 'Personagem' },
      { routerLink: '/pages/dices', titulo: 'Dados' },
   ];

   constructor(private alertController: AlertController, public gameService: GameService) { }

   ngOnInit() { }

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

   decreaseHealthPoint() {
      this.gameService.character.decreaseHealthPoint();
      this.gameService.saveCharacterConfig({healthPoints: this.gameService.character.healthPoints});
   }

   increaseHealthPoint() {
      this.gameService.character.increaseHealthPoint();
      this.gameService.saveCharacterConfig({healthPoints: this.gameService.character.healthPoints});
   }

}
