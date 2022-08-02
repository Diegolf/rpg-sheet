import { GameService } from './../../services/game-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.page.html',
  styleUrls: ['./dices.page.scss'],
})
export class DicesPage implements OnInit {

   @ViewChild('diceRollScreen', {read: IonModal}) diceRollScreen: IonModal;

   public model = {
      numeroDados: 1,
      resultadosDados: []
   };

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  rollDices(){
      this.model.resultadosDados = [this.gameService.dices.dicesFormulas.d20.roll()];

      this.diceRollScreen.present();
  }

}
