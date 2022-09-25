import { GameService } from './services/game.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

   constructor(private renderer: Renderer2, private platform: Platform, gameService: GameService) {
      renderer.setAttribute(document.body, 'color-theme', 'light');

      platform.ready().then(() => {
         gameService.init();
      });
  }
}
