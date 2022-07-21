import { InventoryItem } from '../inventory-items/inventory-item';

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