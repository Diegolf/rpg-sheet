import { GameService } from './services/game.service';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

   constructor(private platform: Platform, gameService: GameService) {
      platform.ready().then(() => {
         gameService.init();
      });
  }
}
