import { InventoryItem } from "../inventory-items/inventory-item";
import { CharacterAtributes, Character, CharacterInventory } from "./character";

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