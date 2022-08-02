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
   this.dices = new OrdemRPGDices();
  }
}
