import { OrdemRPGCharacterConfigData } from './../../models/characters/ordem-rpg-character';
import { StorageService } from './storage.service';
import { OrdemRPGDices } from '../../models/dices/ordem-rpg-dices/orgem-rpg-dices';
import { OrdemRPGCharacter } from '../../models/characters/ordem-rpg-character';
import { Dices } from '../../models/dices/dices';
import { Character } from '../../models/characters/character';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class GameService {

   public character: Character;
   public dices: Dices;

   constructor(private storageService: StorageService) {

   }

   init() {
      this.character = new OrdemRPGCharacter();
      this.dices = new OrdemRPGDices();

      this.loadCharacterConfig();
   }

   public saveCharacterConfig(data: OrdemRPGCharacterConfigData) {
      Object.keys(data).forEach(key => {
         this.storageService.set(key, data[key]);
      });
   }

   private loadCharacterConfig() {
      const healthPoints = this.storageService.get('healthPoints', true);
      const inventory = this.storageService.get('inventory', true);
      const atributes = this.storageService.get('atributes', true);
      this.character.loadConfig({ healthPoints, inventory, atributes });
   }
}
