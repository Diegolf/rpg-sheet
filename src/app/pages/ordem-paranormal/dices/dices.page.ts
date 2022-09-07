import { ordemParanormalExpertisesObject } from './../../../../models/characters/ordem-paranormal-character/expertises';
import { OrdemParanormalCharacter } from './../../../../models/characters/ordem-paranormal-character/character';
import { DicesResultModalComponent, RollOperation, rollOperations } from './../../dices/dices-result-modal/dices-result-modal.component';
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

   /** Lista de dados e suas respectivas formulas, decrição e demais configurações. */
   public dicesFormulas;
   public rollOperations = [];
   public model = {
      rollTimes: 1,
      rollOperation: RollOperation.none
   };

   private readonly maxDicesRoll = 20;

   constructor(
      private gameService: GameService,
      private modalCtrl: ModalController
   ) {
      this.dicesFormulas = this.loadDicesformulas();
      this.rollOperations = rollOperations;
   }

   ngOnInit() {
   }

   async rollDices(dice: OrdemParanormalDice) {

      let times = 1;
      let rollOperation = RollOperation.none;

      // Dados como d2, d3, d6, d20...
      if (dice.askAmount) {
         this.model.rollTimes = (this.model.rollTimes < 1) ? 1 : (this.model.rollTimes > this.maxDicesRoll)
            ? this.maxDicesRoll : this.model.rollTimes;
         times = this.model.rollTimes;
      }
      // Dados baseados em atributos e perícias
      else if (dice.attributeCode) {
         const characterAtribute = this.gameService.character.atributes[dice.attributeCode];

         // Caso o atributo do personagem seja negativo, roda 2 dados e pega o menor resultado
         if (characterAtribute === -1) {
            times = 2;
            rollOperation = RollOperation.lowestResult;
         }
         else {
            times += characterAtribute;
            rollOperation = RollOperation.greaterResult;
         }
      }

      const modal = await this.modalCtrl.create({
         component: DicesResultModalComponent,
         mode: 'ios',
         swipeToClose: true,
         componentProps: { times, dice, rollOperation: this.model.rollOperation, atributes: this.gameService.character.atributes }
      });

      modal.present();
   }

   rollTimesChange(value) {
      const result = this.model.rollTimes + value;
      if (result > 0 && result <= this.maxDicesRoll) {
         this.model.rollTimes = result;
      }
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
