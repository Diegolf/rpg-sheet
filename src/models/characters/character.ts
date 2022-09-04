import { InventoryItem } from '../inventory-items/inventory-item';

export const HP_INITIAL_VALUE = 20;
export const ATRIBUTE_INITIAL_VALUE = 0;
export const INVENTORY_LIMIT = 5;
export const CHARACTER_FREE_ATRIBUTES = 5;

export interface CharacterInventory {
   limit: number;
   currentWeight: number;
   items: InventoryItem[];
}

export interface CharacterAtributes {
   [ID: string]: number;
}

export interface CharacterAtributeInfo {
   code: string;
   name: string;
   description: string;
   pros?: string;
   cons?: string;
   modifierDescription?: string;
}

export interface CharacterHealthPoints {
   current: number;
   max: number;
}

export interface CharacterConfigData {
   name?: string;
   imageUrl?: string;
   healthPoints?: CharacterHealthPoints;
   inventory?: CharacterInventory;
   atributes?: CharacterAtributes;
   remainingAtributes?: number;
}

export interface Character extends CharacterConfigData {
   increaseHealthPoint(amout?: number): void;
   decreaseHealthPoint(amount?: number): void;
   addInventoryItem(item: InventoryItem): boolean;
   removeInventoryItem(index: number): boolean;
   changeAtribute(atributeCode: string, amount: number);
   loadConfig(data: CharacterConfigData): void;
}

export class Character implements Character {
   name: string;
   imageUrl?: string;
   healthPoints: CharacterHealthPoints;
   inventory: CharacterInventory;
   atributes: CharacterAtributes;
   remainingAtributes: number;

   constructor(config: CharacterConfigData = {}) {
      this.name = config.name ?? 'Nome';
      this.imageUrl = config.imageUrl ?? 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
      this.healthPoints = config.healthPoints ?? { current: HP_INITIAL_VALUE, max: HP_INITIAL_VALUE };
      this.inventory = config.inventory ?? { limit: INVENTORY_LIMIT, currentWeight: 0, items: [] };
      this.atributes = config.atributes ?? {
         agi: ATRIBUTE_INITIAL_VALUE,
         dex: ATRIBUTE_INITIAL_VALUE,
         int: ATRIBUTE_INITIAL_VALUE,
         vig: ATRIBUTE_INITIAL_VALUE
      };
      this.remainingAtributes = config.remainingAtributes ?? CHARACTER_FREE_ATRIBUTES;
   }

   increaseHealthPoint(amount: number = 1) {
      if (amount > 0){
         const total = this.healthPoints.current + amount;
         if (total > this.healthPoints.max){
            this.healthPoints.current = this.healthPoints.max;
         }
         else {
            this.healthPoints.current = total;
         }
      }
   }

   decreaseHealthPoint(amount: number = 1) {
      if (amount > 0){
         const total = this.healthPoints.current - amount;
         if (total < 0){
            this.healthPoints.current = 0;
         }
         else {
            this.healthPoints.current = total;
         }
      }
   }

   changeAtribute(atributeCode: string, amount: number) {
      if (atributeCode in this.atributes){
         this.atributes[atributeCode] += amount;
      }
   }

   addInventoryItem(inventoryItem: InventoryItem): boolean {
      if (this.inventory.items.length < this.inventory.limit) {
         return !!this.inventory.items.push(inventoryItem);
      }
      return false;
   }

   removeInventoryItem(index: number): boolean {
      return !!this.inventory.items.splice(index, 1).length;
   }

   loadConfig(data: CharacterConfigData) {
      const { healthPoints, inventory, atributes } = data;

      if (inventory && inventory.limit > 0 && inventory.limit <= INVENTORY_LIMIT && inventory.items.length <= inventory.limit) {
         this.inventory = inventory;
      }

      if (healthPoints && healthPoints.current >= 0 && healthPoints.max >= 0) {
         this.healthPoints = healthPoints;
      }

      if (atributes && atributes.agi >= 0 && atributes.dex >= 0 && atributes.int >= 0 && atributes.vig >= 0) {
         this.atributes = atributes;
      }
   }
}
