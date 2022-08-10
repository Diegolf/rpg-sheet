import { InventoryItem } from '../inventory-items/inventory-item';
import {
   CharacterAtributes, Character, CharacterInventory, CharacterHealthPoints,
   HP_INITIAL_VALUE, ATRIBUTE_INITIAL_VALUE, INVENTORY_LIMIT, CharacterConfigData, CharacterAtributeInfo
} from './character';


export interface OrdemRPGCharacterAtributes extends CharacterAtributes {
   agi: number;
   vig: number;
   dex: number;
   int: number;
}

export const characterAtributesInfo: CharacterAtributeInfo[] = [
   {
      code: 'vig',
      name: 'Vigor',
      description: '',
      pros: '<p>Cada ponto aumenta a <b>Vida</b> em <b>4</b> pontos.</p>',
      cons: '<p>Reduz a perícia <b>Esquiva</b>.</p>',
      modifierDescription: '<p>A Cada <b>3</b> pontos o jogador pode realizar <b>mais uma ação</b> a cada <b>2</b> rodadas.</p>'
   },
   {
      code: 'agi',
      name: 'Agilidade',
      description: '',
      pros: '<p>Melhora a perícia <b>Esquiva</b>.</p>',
      cons: '<p>Cada ponto reduz a <b>Vida</b> em <b>2</b> pontos.</p>',
      modifierDescription: '<p>A cada <b>3</b> pontos o jogador pode <b>Esquivar, Aparar ou Revidar</b> mais <b>2</b> vezes por rodada.</p>'
   },
   {
      code: 'dex',
      name: 'Destreza',
      description: '',
      pros: '<p>Melhora as perícias <b>Acerto, Aparar e Furtividade</b>.</p>',
      cons: '',
      modifierDescription: '<p>A cada <b>3</b> pontos aumenta <b>+3</b> de <b>dano final</b> para ataques do jogador.</p>'
   },
   {
      code: 'int',
      name: 'Inteligência',
      description: '',
      pros: '<p>Melhora as perícias <b>Crítico e Percepção</b> e aumenta o resultado de <b>Curas (item)</b>.</p>',
      cons: '',
      modifierDescription: '<p>A cada <b>3</b> pontos aumenta em <b>+5</b> a chance de reanimar um aliado.</p>'
   },
];

export interface OrdemRPGCharacterConfigData extends CharacterConfigData {
   healthPoints?: CharacterHealthPoints;
   inventory?: CharacterInventory;
   atributes?: OrdemRPGCharacterAtributes;
   remainingAtributes?: number;
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

   increaseAtribute(atributeCode: string, amount: number) {
      if (atributeCode in this.atributes){
         this.atributes[atributeCode] += amount;

         let healthChange = 0;
         if (atributeCode === 'vig'){
            healthChange = amount * 4;
         }
         else if (atributeCode === 'agi'){
            healthChange = -(amount * 2);
         }

         if (healthChange){
            this.healthPoints.max += healthChange;
            this.healthPoints.current += healthChange;
         }
      }
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

      if (atributes && atributes.agi >= 0 && atributes.dex >= 0 && atributes.int >= 0 && atributes.vig >= 0) {
         this.atributes = atributes;
      }
   }
}
