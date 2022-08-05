import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { characterAtributesInfo } from 'src/models/characters/ordem-rpg-character';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

   public atributesInfo;

  constructor(public gameService: GameService) {
   this.loadAtributesInfo();
  }

  ngOnInit() { }

  private loadAtributesInfo() {
   const characterAtributesKeys = Object.keys(this.gameService.character.atributes);
   this.atributesInfo = characterAtributesInfo.filter(atribute => characterAtributesKeys.includes(atribute.code))
      .map((atribute) => ({...atribute, value: this.gameService.character.atributes[atribute.code] }));
   console.log(this.atributesInfo);
  };

}
