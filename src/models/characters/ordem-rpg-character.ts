import { InventoryItem } from '../inventory-items/inventory-item';
import {
   CharacterAtributes, Character, CharacterInventory, CharacterHealthPoints,
   HP_INITIAL_VALUE, ATRIBUTE_INITIAL_VALUE, INVENTORY_LIMIT, CharacterConfigData
} from './character';


export interface OrdemRPGCharacterAtributes extends CharacterAtributes {
   agi: number;
   vig: number;
   dex: number;
   int: number;
}

export interface OrdemRPGCharacterConfigData extends CharacterConfigData {
   healthPoints?: CharacterHealthPoints;
   inventory?: CharacterInventory;
   atributes?: OrdemRPGCharacterAtributes;
}

export class OrdemRPGCharacter implements Character {
   healthPoints: CharacterHealthPoints;
   inventory: CharacterInventory;
   atributes: OrdemRPGCharacterAtributes;

   constructor(healthPoints?: CharacterHealthPoints, inventory?: CharacterInventory, atributes?: OrdemRPGCharacterAtributes) {
      this.healthPoints = healthPoints ?? { current: HP_INITIAL_VALUE, max: HP_INITIAL_VALUE };
      this.inventory = inventory ?? { limit: INVENTORY_LIMIT, items: [] };
      this.atributes = atributes ?? {
         agi: ATRIBUTE_INITIAL_VALUE,
         dex: ATRIBUTE_INITIAL_VALUE,
         int: ATRIBUTE_INITIAL_VALUE,
         vig: ATRIBUTE_INITIAL_VALUE
      };
   }

   addInventoryItem(inventoryItem: InventoryItem): boolean {
      throw new Error('Method not implemented.');
   }
   removeInventoryItem(inventoryItem: InventoryItem): boolean {
      throw new Error('Method not implemented.');
   }

   loadConfig(data: OrdemRPGCharacterConfigData) {
      const { healthPoints, inventory, atributes } = data;

      if (inventory && inventory.limit > 0 && inventory.limit <= INVENTORY_LIMIT && inventory.items.length <= inventory.limit) {
         this.inventory = inventory;
      }

      if (healthPoints && healthPoints.current >= 0 && healthPoints.max >= 0) {
         this.healthPoints = healthPoints;
      }

      if (atributes && atributes.agi >=0 && atributes.dex >= 0 && atributes.int >= 0 && atributes.vig >= 0) {
         this.atributes = atributes;
      }
   }
}
