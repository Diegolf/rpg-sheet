import { OrdemParanormalDices } from './../../models/dices/ordem-paranormal-dices/ordem-paranormal-dices';
import {
   OrdemParanormalCharacter, OrdemParanormalCharacterConfigData
} from '../../models/characters/ordem-paranormal-character/character';
import { CharacterConfigData } from './../../models/characters/character';
import { StorageService } from './storage.service';
import { Dices } from '../../models/dices/dices';
import { Character } from '../../models/characters/character';
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
      this.character = new OrdemParanormalCharacter();
      this.dices = new OrdemParanormalDices();

      this.loadCharacterConfig(Object.keys(this.character) as Array<keyof OrdemParanormalCharacterConfigData>);
   }

   public saveCharacterConfig(dataKeys: string[]) {
      const data = this.character.getConfig(dataKeys);
      Object.keys(data).forEach(key => {
         this.storageService.set(key, data[key], true);
      });
   }

   private loadCharacterConfig(dataKeys: string[]) {
      const configData = dataKeys.reduce((acc, key) => {
         acc[key] = this.storageService.get(key, true);
         return acc;
      }, {});

      this.character.loadConfig(configData);
   }
}
