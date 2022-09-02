import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { GameService } from 'src/app/services/game.service';
import { ordemParanormalCharacterAtributesInfo } from 'src/models/characters/ordem-paranormal-character/ordem-paranormal-atributes';

@Component({
  selector: 'app-ordem-paranormal-atributes',
  templateUrl: './ordem-paranormal-atributes.component.html',
  styleUrls: ['./ordem-paranormal-atributes.component.scss'],
})
export class OrdemParanormalAtributesComponent implements OnInit {

   @ViewChild('modal') modal: IonModal;

   public atributesInfo: any[];
   public modalData: any = {};

   constructor(
      public gameService: GameService,
      public toastController: ToastController) {
      this.loadAtributesInfo();
   }

   ngOnInit() {
   }

   // addAtribute(atribute) {
   //    if (atribute.value < 3 && this.remainingAtributes > 0) {
   //       this.remainingAtributes--;
   //       atribute.value++;
   //       atribute.spentPoints = (atribute.spentPoints || 0) + 1;
   //    }
   // }
   // removeAtribute(atribute) {
   //    if (atribute.value > 0) {
   //       this.remainingAtributes++;
   //       atribute.value--;
   //       atribute.spentPoints--;
   //    }
   // }

   // async salvarAtributos() {
   //    const consumedList = this.atributesInfo.filter(a => a.spentPoints);
   //    if (consumedList.length > 0) {
   //       consumedList.forEach(a => {
   //          this.gameService.character.increaseAtribute(a.code, a.spentPoints);
   //          this.gameService.characterRemainingAtributes -= a.spentPoints;
   //          a.spentPoints = 0;
   //       });

   //       this.gameService.saveCharacterConfig({
   //          atributes: this.gameService.character.atributes,
   //          healthPoints: this.gameService.character.healthPoints,
   //          remainingAtributes: this.remainingAtributes
   //       });
   //       this.toast('Atributos salvos.');
   //    }
   //    else {
   //       this.toast('Nada a salvar.');
   //    }
   // }

   async atributeDetail(atribute: any) {
      this.modalData = {...atribute, auxValue: atribute.value};
      this.modal.present();

      const { data: value, role } = await this.modal.onWillDismiss();

      if (role === 'save') {
         atribute.value = value <= -1? -1 : value >= 5 ? 5 : value;
      }
   }

   changeAtribute(atribute: any, increment = false) {
      atribute.auxValue += increment ? 1 : -1;
   }

   private loadAtributesInfo() {
      const characterAtributesKeys = Object.keys(this.gameService.character.atributes);
      this.atributesInfo = ordemParanormalCharacterAtributesInfo.filter(atribute => characterAtributesKeys.includes(atribute.code))
         .map((atribute) => ({ ...atribute, value: this.gameService.character.atributes[atribute.code] }));
   };

   private async toast(message: string) {
      const toast = await this.toastController.create({
         message,
         position: 'top',
         duration: 2000,
      });
      await toast.present();
   }

}
