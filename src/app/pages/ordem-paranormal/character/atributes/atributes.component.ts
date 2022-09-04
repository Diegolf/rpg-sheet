import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { GameService } from 'src/app/services/game.service';
import { ordemParanormalCharacterAtributesInfo } from 'src/models/characters/ordem-paranormal-character/atributes';
import { OrdemParanormalCharacter, OrdemParanormalCharacterConfigData } from 'src/models/characters/ordem-paranormal-character/character';

@Component({
  selector: 'app-ordem-paranormal-atributes',
  templateUrl: './atributes.component.html',
  styleUrls: ['./atributes.component.scss'],
})
export class OPCAtributesComponent implements OnInit {

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

   async atributeDetail(atribute: any) {
      this.modalData = {...atribute, auxValue: atribute.value};
      this.modal.present();

      const { data: value, role } = await this.modal.onWillDismiss();

      if (role === 'save' && value !== atribute.value) {
         this.gameService.character.changeAtribute(atribute.code, value);
         atribute.value = this.gameService.character.atributes[atribute.code];

         const characterData = this.gameService.character as OrdemParanormalCharacter;
         this.gameService.saveCharacterConfig({
            atributes: characterData.atributes,
            healthPoints: characterData.healthPoints,
            weightLimit: characterData.weightLimit,
            weightPenalty: characterData.weightPenalty,
            ep: characterData.ep
         } as OrdemParanormalCharacterConfigData);
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

}
