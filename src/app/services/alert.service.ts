import { ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';

export enum ToastType {
   default = 1,
   success = 2,
   error = 3,
   warning = 4,
}

@Injectable({
   providedIn: 'root'
})
export class ToastService {

   constructor(private toastController: ToastController) { }

   async toast(props: {
      message: string;
      type?: ToastType;
      icon?: string;
      position?: 'top' | 'bottom' | 'middle';
      duration?: number;
      cssClass?: string;
   }) {
      let cssClass = '';
      let icon = '';
      switch(props.type){
         case ToastType.success: {
            cssClass = 'success-toast';
            icon = 'checkmark-circle-sharp';
            break;
         }
         case ToastType.error: {
            cssClass = 'error-toast';
            icon = 'close-circle-sharp';
            break;
         }
         case ToastType.warning: {
            cssClass = 'warning-toast';
            icon = 'alert-circle-sharp';
            break;
         }
      }

      const toast = await this.toastController.create({
         message: props.message,
         position: props.position || 'bottom',
         duration: props.duration || 2000,
         icon: props.icon || icon,
         cssClass: props.cssClass || cssClass,
         mode: 'ios',
      });
      await toast.present();
   }
}
