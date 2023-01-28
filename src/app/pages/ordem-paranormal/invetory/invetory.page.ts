import { OrdemParanormalCharacter } from './../../../../models/characters/ordem-paranormal-character/character';
import { AlertController } from '@ionic/angular';
import { InventoryItem } from './../../../../models/inventory-items/inventory-item';
import { GameService } from './../../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService, ToastType } from 'src/app/services/alert.service';

@Component({
   selector: 'app-invetory',
   templateUrl: './invetory.page.html',
   styleUrls: ['./invetory.page.scss'],
})
export class InvetoryPage implements OnInit {

   itemForm = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: [1, [Validators.required, Validators.min(0)]]
   });

   model = {};

   constructor(
      private formBuilder: FormBuilder,
      private gameSerivce: GameService,
      private toastService: ToastService,
      private alertController: AlertController
   ) { }

   ngOnInit() {
   }

   async inserirItem() {
      const item = {
         ...this.itemForm.value,
         code: Date.now().toString()
      } as InventoryItem;

      if (this.gameSerivce.character.addInventoryItem(item)) {
         this.gameSerivce.saveCharacterConfig(['inventory', 'weightLimit', 'weightPenalty']);
         this.itemForm.reset({ size: 1 });
         this.toastService.toast({ message: 'Item adicionado ao inventário', type: ToastType.success });
      }
      else {
         this.toastService.toast({ message: 'Espaço do inventário insulficiente', type: ToastType.warning });
      }
   }

   removerItem(index) {
      if (this.gameSerivce.character.removeInventoryItem(index)) {
         this.gameSerivce.saveCharacterConfig(['inventory', 'weightLimit', 'weightPenalty']);
         this.toastService.toast({ message: 'Item removido do inventário', type: ToastType.success });
      }
      else {
         this.toastService.toast({ message: 'Ocorreu um erro ao remover item do inventário', type: ToastType.error });
      }
   }

   async editItem(index) {
      const character = (this.gameSerivce.character as OrdemParanormalCharacter);
      const item = character.inventory.items[index];
      const alert = await this.alertController.create({
         mode: 'ios',
         header: 'Editar Descrição do Item',
         buttons: [
            'Cancelar',
            {
               text: 'Confirmar',
               handler: (values) => {
                  if (values) {
                     if (!values.name) {
                        delete values.name;
                     }
                     if (!values.description) {
                        delete values.description;
                     }
                     if (!values.size) {
                        delete values.size;
                     }
                     else {
                        values.size = parseInt(values.size, 10);
                     }
                     character.changeInventoryItem(index, values as InventoryItem);
                     this.gameSerivce.saveCharacterConfig(['inventory']);
                  }
               }
            }
         ],
         inputs: [
            {
               placeholder: 'Descrição',
               type: 'text',
               name: 'name',
               value: item.name
            },
            {
               placeholder: 'Descrição',
               type: 'textarea',
               name: 'description',
               value: item.description
            },
            {
               placeholder: 'Carga',
               type: 'number',
               name: 'size',
               value: item.size
            },
         ],
      });

      await alert.present();
   }

   toggleCard(cardKey) {
      this.model[cardKey] = !this.model[cardKey];
   }
}
