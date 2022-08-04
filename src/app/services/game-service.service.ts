import { OrdemRPGDices } from './../../models/dices/ordem-rpg-dices/orgem-rpg-dices';
import { OrdemRPGCharacter } from './../../models/characters/ordem-rpg-character';
import { Dices } from './../../models/dices/dices';
import { Character } from './../../models/characters/character';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

   public character: Character;
   public dices: Dices;

  constructor() {

  }

  init() {
   this.character = new OrdemRPGCharacter();
   this.character.atributes.agi = 3;
   this.character.atributes.vig = 3;
   this.character.atributes.dex = 3;
   this.character.atributes.int = 3;
   this.dices = new OrdemRPGDices();
  }
}
