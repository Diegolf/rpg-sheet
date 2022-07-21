import { InventoryItem } from './inventory-item';

export interface CharacterInventory {
   limit: number;
   items: InventoryItem[];
}

export interface CharacterAtributes {
   [ID: string] : number;
}

export interface Character {
   healthPoints: number;
   inventory: CharacterInventory;
   atributes: CharacterAtributes;

   addInventoryItem(inventoryItem: InventoryItem): () => boolean;
   removeInventoryItem(InventoryItem: InventoryItem): () => boolean;
   loadConfig(config: any): () => void;
   saveConfig(): () => void;
}

export interface OrdemRPGCharacterAtributes extends CharacterAtributes {
   AGI: number;
   VIG: number;
   DEX: number;
   INT: number;
}

export class OrdemRPGCharacter implements Character {
   healthPoints: number;
   inventory: CharacterInventory;
   atributes: OrdemRPGCharacterAtributes;
   
   constructor(healthPoints, inventory, atributes) {
      this.healthPoints = healthPoints;
      this.inventory = inventory;
      this.atributes = atributes;      
   }

   addInventoryItem(inventoryItem: InventoryItem): () => boolean {
      throw new Error('Method not implemented.');
   }
   removeInventoryItem(InventoryItem: InventoryItem): () => boolean {
      throw new Error('Method not implemented.');
   }

   loadConfig(config: object): () => void {
      throw new Error('Method not implemented.');
   }

   saveConfig(): () => void {
      throw new Error('Method not implemented.');
   }
}