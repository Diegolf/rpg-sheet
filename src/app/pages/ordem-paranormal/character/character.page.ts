import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-ordem-paranormal-character',
   templateUrl: './character.page.html',
   styleUrls: ['./character.page.scss'],
})
export class OPCharacterPage implements OnInit {

   public model = {};

   ngOnInit(): void {

   }

   toggleCard(cardKey){
      this.model[cardKey] = !this.model[cardKey];
   }

}
