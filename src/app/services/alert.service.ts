import { ToastController, ToastOptions } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class ToastService {

   constructor(private toastController: ToastController) { }

   async toast(props: {
      message: string;
      icon?: string;
      position?: 'top' | 'bottom' | 'middle';
      duration?: number;
      cssClass?: string;
   }) {
      const toast = await this.toastController.create({
         message: props.message,
         position: props.position || 'bottom',
         duration: props.duration || 2000,
         icon: props.icon,
         cssClass: props.cssClass,
         mode: 'ios',
      });
      await toast.present();
   }
}
