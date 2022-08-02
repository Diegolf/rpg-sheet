import { InventoryItem } from '../inventory-items/inventory-item';
import { CharacterAtributes, Character, CharacterInventory } from './character';


export interface OrdemRPGCharacterAtributes extends CharacterAtributes {
   agi: number;
   vig: number;
   dex: number;
   int: number;
}

export class OrdemRPGCharacter implements Character {
   healthPoints: number;
   inventory: CharacterInventory;
   atributes: OrdemRPGCharacterAtributes;

   constructor(healthPoints?: number, inventory?: CharacterInventory, atributes?: OrdemRPGCharacterAtributes) {
      this.healthPoints = healthPoints ?? 0;
      this.inventory = inventory ?? { limit: 0, items: [] };
      this.atributes = atributes ?? { agi: 0, dex: 0, int: 0, vig: 0 };
   }

   addInventoryItem(inventoryItem: InventoryItem): () => boolean {
      throw new Error('Method not implemented.');
   }
   removeInventoryItem(inventoryItem: InventoryItem): () => boolean {
      throw new Error('Method not implemented.');
   }

   loadConfig(config: object): () => void {
      throw new Error('Method not implemented.');
   }

   saveConfig(): () => void {
      throw new Error('Method not implemented.');
   }
}
