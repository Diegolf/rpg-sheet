import { OrdemRPGCharacterAtributes } from './../../../models/characters/ordem-rpg-character';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { characterAtributesInfo } from 'src/models/characters/ordem-rpg-character';
import { ToastController } from '@ionic/angular';

@Component({
   selector: 'app-character',
   templateUrl: './character.page.html',
   styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

   public atributesInfo: any[];
   public remainingAtributes: number;

   constructor(public gameService: GameService, public toastController: ToastController) {
      this.loadAtributesInfo();
   }

   ngOnInit() { }

   addAtribute(atribute) {
      if (atribute.value < 3 && this.remainingAtributes > 0) {
         this.remainingAtributes--;
         atribute.value++;
         atribute.spentPoints = (atribute.spentPoints || 0) + 1;
      }
   }

   removeAtribute(atribute) {
      if (atribute.value > 0) {
         this.remainingAtributes++;
         atribute.value--;
         atribute.spentPoints--;
      }
   }

   async salvarAtributos() {
      const consumedList = this.atributesInfo.filter(a => a.spentPoints);
      if (consumedList.length > 0) {
         consumedList.forEach(a => {
            this.gameService.character.atributes[a.code] += a.spentPoints;
            this.gameService.characterRemainingAtributes -= a.spentPoints;
            a.spentPoints = 0;
         });

         this.gameService.saveCharacterConfig({
            atributes: this.gameService.character.atributes as OrdemRPGCharacterAtributes,
            remainingAtributes: this.remainingAtributes
         });
         this.toast('Atributos salvos.');
      }
      else {
         this.toast('Nada a salvar.');
      }
   }

   private async toast(message: string) {
      const toast = await this.toastController.create({
         message,
         position: 'top',
         duration: 2000,
      });
      await toast.present();
   }

   private loadAtributesInfo() {
      const characterAtributesKeys = Object.keys(this.gameService.character.atributes);
      this.atributesInfo = characterAtributesInfo.filter(atribute => characterAtributesKeys.includes(atribute.code))
         .map((atribute) => ({ ...atribute, value: this.gameService.character.atributes[atribute.code] }));
      this.remainingAtributes = this.gameService.characterRemainingAtributes;
   };

}
