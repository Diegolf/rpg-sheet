import { InventoryItem } from './../../../../models/inventory-items/inventory-item';
import { GameService } from './../../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/alert.service';

@Component({
   selector: 'app-invetory',
   templateUrl: './invetory.page.html',
   styleUrls: ['./invetory.page.scss'],
})
export class InvetoryPage implements OnInit {

   itemForm = this.fb.group({
      code: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: [1, [Validators.required, Validators.min(0)]]
   });

   model = {};
   items = [];

   constructor(
      private fb: FormBuilder,
      private gameSerivce: GameService,
      private toastService: ToastService
   ) { }

   ngOnInit() {
   }

   async inserirItem() {
      const item = {
         ...this.itemForm.value,
         code: Date.now().toString()
      } as InventoryItem;

      if (this.gameSerivce.character.addInventoryItem(item)) {
         this.itemForm.reset({ size: 1 });

         this.toastService.toast({
            message: 'Item adicionado ao inventário',
            icon: 'checkmark-circle-sharp',
            cssClass: 'success-toast',
         });
      }
      else {
         this.toastService.toast({
            message: 'Espaço do inventário insulficiente',
            icon: 'alert-circle-sharp',
            cssClass: 'warning-toast',
         });
      }
   }

   removerItem(index) {
      if (this.gameSerivce.character.removeInventoryItem(index)){

      }
   }

   toggleCard(cardKey) {
      this.model[cardKey] = !this.model[cardKey];
   }
}
