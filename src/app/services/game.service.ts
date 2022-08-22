import { ParanormalDNDCharacterConfigData } from '../../models/characters/paranormal-dnd-character';
import { StorageService } from './storage.service';
import { ParanormalDNDDices } from '../../models/dices/paranormal-dnd-dices/paranormal-dnd-dices';
import { ParanormalDNDCharacter } from '../../models/characters/paranormal-dnd-character';
import { Dices } from '../../models/dices/dices';
import { Character, CHARACTER_FREE_ATRIBUTES } from '../../models/characters/character';
import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class GameService {

   public character: Character;
   public dices: Dices;

   public characterRemainingAtributes: number;

   constructor(private storageService: StorageService) {

   }

   init() {
      this.character = new ParanormalDNDCharacter();
      this.dices = new ParanormalDNDDices();

      this.loadCharacterConfig();
   }

   public saveCharacterConfig(data: ParanormalDNDCharacterConfigData) {
      Object.keys(data).forEach(key => {
         this.storageService.set(key, data[key], true);
      });
   }

   private loadCharacterConfig() {
      const healthPoints = this.storageService.get('healthPoints', true);
      const inventory = this.storageService.get('inventory', true);
      const atributes = this.storageService.get('atributes', true);
      this.character.loadConfig({ healthPoints, inventory, atributes });

      const characterAtributesRemaining = this.storageService.get('remainingAtributes', true);
      this.characterRemainingAtributes = characterAtributesRemaining ?? CHARACTER_FREE_ATRIBUTES;
   }
}
