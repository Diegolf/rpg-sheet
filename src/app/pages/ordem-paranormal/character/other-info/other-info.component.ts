import { GameService } from './../../../../services/game.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-other-ordem-paranormal-info',
   templateUrl: './other-info.component.html',
   styleUrls: ['./other-info.component.scss'],
})
export class OtherOPInfoComponent implements OnInit {

   constructor(public modalCtrl: ModalController, public gameService: GameService) {
      console.log(gameService.character.imageUrl);
   }

   ngOnInit() { }

}
