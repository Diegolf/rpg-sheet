/** Items that the character will carry */
export interface InventoryItem {
   name: string;
   code: string;
   description?: string;

   /** Amout of space needed to carry the item */
   size?: number;

   /** Image url of the item for display */
   imageUrl?: string;
}
