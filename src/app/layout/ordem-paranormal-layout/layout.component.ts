import { ToastService, ToastType } from 'src/app/services/alert.service';
import { OrdemParanormalCharacter } from './../../../models/characters/ordem-paranormal-character/character';
import { GameService } from './../../services/game.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, IonModal } from '@ionic/angular';

@Component({
   selector: 'app-ordem-paranormal-layout',
   templateUrl: './layout.component.html',
   styleUrls: ['./layout.component.scss'],
})
export class OPLayoutComponent implements OnInit {

   @ViewChild(IonModal) otherInfoModal: IonModal;

   public rotas = [
      { routerLink: '/pages/character', titulo: 'Personagem', icon:'person' },
      { routerLink: '/pages/dices', titulo: 'Dados', icon:'dice' },
      { routerLink: '/pages/inventory', titulo: 'Inventário', icon:'file-tray-full' },
   ];

   public otherInfoModel = {
      imageUrl: '',
      name: '',
      nex: 0,
      ep: 0,
      exportedData: '',
      importData: '',
      showImportInput: false
   };

   public nexPercentage;
   public nexList = [];

   constructor(
      public gameService: GameService,
      private alertController: AlertController,
      private modalCtrl: ModalController,
      private toastService: ToastService
   ) { }

   ngOnInit() {
      const characterData = this.gameService.character as OrdemParanormalCharacter;
      this.otherInfoModel = {
         ...this.otherInfoModel,
         imageUrl: characterData.imageUrl,
         name: characterData.name,
         nex: characterData.nex,
         ep: characterData.ep.current
      };
      this.calculateNexPercentage();

      this.nexList = [...Array(21).keys()].map((v: number) => ({ value: v, text: `${v * 5 === 100 ? 99 : v * 5}%` }));
   }

   otherInfoWillDismiss(event) {
      if (!event || !event.detail || !(event.detail.role === 'importedInfo')) {
         const changes = [];
         const characterData = this.gameService.character as OrdemParanormalCharacter;

         if (this.otherInfoModel.imageUrl !== characterData.imageUrl) {
            characterData.imageUrl = this.otherInfoModel.imageUrl;
            changes.push('imageUrl');
         }

         if (this.otherInfoModel.name !== characterData.name) {
            characterData.name = this.otherInfoModel.name;
            changes.push('name');
         }

         if (this.otherInfoModel.nex !== characterData.nex) {
            characterData.changeNex(this.otherInfoModel.nex);
            this.calculateNexPercentage();
            changes.push(...['nex', 'healthPoints', 'ep', 'sanity']);
         }

         if (this.otherInfoModel.ep !== characterData.ep.current) {
            characterData.changeEffortByamout(this.otherInfoModel.ep - characterData.ep.current);
            changes.push('ep');
         }

         if (changes.length > 0) {
            this.gameService.saveCharacterConfig([...new Set(changes)]);
         }
      }

      this.otherInfoModel.exportedData = '';
      this.otherInfoModel.showImportInput = false;
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

   importConfig() {
      if (!this.otherInfoModel.importData) {
         this.toastService.toast({ message: 'Informe as configurações a serem importadas.', type: ToastType.error });
         return;
      }

      try {
         this.gameService.importCharacterConfig(JSON.parse(atob(this.otherInfoModel.importData)));
         this.toastService.toast({ message: 'Configurações importadas.', type: ToastType.success });
         this.otherInfoModal.dismiss(null, 'importedInfo');
      } catch (error) {
         this.toastService.toast({ message: 'Ocorreu um erro ao importar as configurações.', type: ToastType.error });
      }
   }

   exportConfig() {
      this.otherInfoModel.exportedData = this.gameService.exportCharacterConfig();
   }

   private calculateNexPercentage() {
      const nexPercentage = (this.gameService.character as OrdemParanormalCharacter).nex * 5;
      this.nexPercentage = nexPercentage >= 100 ? '99%' : (nexPercentage + '%');
   }
}
