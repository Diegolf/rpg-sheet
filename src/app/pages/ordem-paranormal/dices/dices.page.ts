import { ordemParanormalExpertisesObject } from './../../../../models/characters/ordem-paranormal-character/expertises';
import { OrdemParanormalCharacter } from './../../../../models/characters/ordem-paranormal-character/character';
import { DicesResultModalComponent } from './../../dices/dices-result-modal/dices-result-modal.component';
import { OrdemParanormalDice } from './../../../../models/dices/ordem-paranormal-dices/ordem-paranormal-dices';
import { GameService } from './../../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
   selector: 'app-ordem-paranormal-dices',
   templateUrl: './dices.page.html',
   styleUrls: ['./dices.page.scss'],
})
export class OPDicesPage implements OnInit {

   // @ViewChild('diceRollScreen', { read: IonModal }) diceRollScreen: IonModal;

   public dicesFormulas;
   // public model = {
   //    rollTimes: 1,
   // };

   constructor(
      private gameService: GameService,
      private modalCtrl: ModalController
   ) {
      this.dicesFormulas = this.loadDicesformulas();
   }

   ngOnInit() {
   }

   async rollDices(dice: OrdemParanormalDice) {

      let times = 1;
      if (dice.askAmount) {

      }
      else if (dice.attributeCode) {
         const characterAtribute = this.gameService.character.atributes[dice.attributeCode];
         if (characterAtribute === -1) {
            times = 2;
         }
         else {
            times += characterAtribute;
         }
      }

      const modal = await this.modalCtrl.create({
         component: DicesResultModalComponent,
         mode: 'ios',
         swipeToClose: true,
         componentProps: { times, dice, atributes: this.gameService.character.atributes }
      });

      modal.present();
   }

   private loadDicesformulas() {
      // Perícias treinadas do personagem
      const characterExpertises = (this.gameService.character as OrdemParanormalCharacter).expertises;

      // Carrega os dados com as descrições das perícias atribuidas a cada dado e o quanto o personagem é treinado na perícia
      const dicesformulas = Object.values(this.gameService.dices.dicesFormulas).map((dice: OrdemParanormalDice) => {

         // Lista de perícias relacionadas ao dado
         dice.formulaDescription = dice.expertises == null ? '' : dice.expertises.reduce((acc, expertise) => {

            // Informações da Perícia do personagem
            const characterExpertise = characterExpertises.find(characterExpertiseInfo => characterExpertiseInfo.code === expertise);

            // O quanto o personagem é treinado na perícia
            const expertiseAditional =
               characterExpertise != null ? ` (${characterExpertise.info.text} +${characterExpertise.info.value})` : '';

            // Nome da perícia + o quanto o personagem é treinado nela
            acc.push(`${ordemParanormalExpertisesObject[expertise].name}${expertiseAditional}`);

            return acc;

         }, []).sort((a, b) => a.localeCompare(b)).join(', ');
         //    acc.push({
         //       value: characterExpertise?.info.value || 0,
         //       text: `${ordemParanormalExpertisesObject[exp].name}${expertiseAditional}`
         //    });

         //    return acc;
         // }, []).sort((a,b) => b.value - a.value).map(a => a.text).join(', ');

         return dice;
      });
      return dicesformulas;
   }

}
