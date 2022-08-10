import { InventoryItem } from '../inventory-items/inventory-item';

export const HP_INITIAL_VALUE = 20;
export const ATRIBUTE_INITIAL_VALUE = 0;
export const INVENTORY_LIMIT = 5;
export const CHARACTER_FREE_ATRIBUTES = 5;

export interface CharacterInventory {
   limit: number;
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
   healthPoints?: CharacterHealthPoints;
   inventory?: CharacterInventory;
   atributes?: CharacterAtributes;
}

export interface Character {
   healthPoints: CharacterHealthPoints;
   inventory: CharacterInventory;
   atributes: CharacterAtributes;

   increaseHealthPoint(amout?: number): void;
   decreaseHealthPoint(amount?: number): void;
   addInventoryItem(inventoryItem: InventoryItem): boolean;
   removeInventoryItem(InventoryItem: InventoryItem): boolean;
   increaseAtribute(atributeCode: string, amount: number);
   loadConfig(data: CharacterConfigData): void;
}
