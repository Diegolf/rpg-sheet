import { DicesResultModalComponent } from './dices-result-modal/dices-result-modal.component';
import { Dice } from './../../../models/dices/dices';
import { GameService } from './../../services/game-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
   selector: 'app-dices',
   templateUrl: './dices.page.html',
   styleUrls: ['./dices.page.scss'],
})
export class DicesPage implements OnInit {

   @ViewChild('diceRollScreen', { read: IonModal }) diceRollScreen: IonModal;

   public dicesFormulas;
   public model = {
      rollTimes: 1,
   };

   constructor(
      private gameService: GameService,
      private modalCtrl: ModalController
   ) {
      this.dicesFormulas = Object.values(gameService.dices.dicesFormulas);
   }

   ngOnInit() {
   }

   async rollDices(dice: Dice) {
      const times = (this.model.rollTimes < 1) ? 1 : (this.model.rollTimes > 6) ? 6 : this.model.rollTimes;
      const dicesResultList = Array.from({ length: times }, () => dice.roll(this.gameService.character.atributes));

      this.model.rollTimes = times;
      // this.diceRollScreen.present();

      const modal = await this.modalCtrl.create({
         component: DicesResultModalComponent,
         mode: 'ios',
         swipeToClose: true,
         componentProps: { dicesResultList, dice }
      });

      modal.present();
   }

}
