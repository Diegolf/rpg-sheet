import { InventoryItem } from './../../inventory-items/inventory-item';
import { ATRIBUTE_INITIAL_VALUE } from '../character';
import { OrdemParanormalClass, ordemParanormalClasses } from './classes';
import { OrdemParanormalCharacterAtributes, OrdemParanormalAtributesCodes } from './atributes';
import {  OrdemParanormalExpertisesCodes, OrdemParanormalExpertiseInfo } from './expertises';
import { Character, CharacterConfigData } from '../character';

export const NEX_INITIAL_VALUE = 5;
export const WEIGHT_LIMIT_INITIAL_VALUE = 5;
export const WEIGHT_PER_STRENGTH = 5;

export interface OrdemParanormalCharacterExpertise {
   code: OrdemParanormalExpertisesCodes;
   info: OrdemParanormalExpertiseInfo;
}

export interface OrdemParanormalCharacterEffortPoints {
   current: number;
   max: number;
}

export interface OrdemParanormalCharacterConfigData extends CharacterConfigData {
   atributes?: OrdemParanormalCharacterAtributes;
   pe?: OrdemParanormalCharacterEffortPoints;
   nex?: number;
   weightLimit?: number;
   weightPenalty?: boolean;
   characterClass?: OrdemParanormalClass;
   expertises?: OrdemParanormalCharacterExpertise[];
}

export class OrdemParanormalCharacter extends Character implements OrdemParanormalCharacterConfigData {
   // origin:

   /** Lista de atributos */
   atributes: OrdemParanormalCharacterAtributes;

   /** Classe do personagem */
   characterClass: OrdemParanormalClass;

   /** Perícias */
   expertises: OrdemParanormalCharacterExpertise[];

   /** Pontos de esforço */
   ep: OrdemParanormalCharacterEffortPoints;

   /** Nível de exposição paranormal */
   nex: number;

   /** Limite de peso. Se ultrapassar esse limite, fica sobrecarregado até um máximo do dobro. */
   weightLimit: number;

   /** Indica se está atualmente sofrento penalidade por limite de peso */
   weightPenalty: boolean;

   constructor(config: OrdemParanormalCharacterConfigData = {}) {
      super(config);
      this.atributes = config.atributes ?? {
         agi: ATRIBUTE_INITIAL_VALUE,
         int: ATRIBUTE_INITIAL_VALUE,
         vig: ATRIBUTE_INITIAL_VALUE,
         for: ATRIBUTE_INITIAL_VALUE,
         pre: ATRIBUTE_INITIAL_VALUE,
      };
      this.ep = config.pe ?? {current: 0, max: 0};
      this.nex = config.nex ?? NEX_INITIAL_VALUE;
      this.characterClass = config.characterClass ?? ordemParanormalClasses[0];
      this.expertises = config.expertises ?? [];
      this.weightLimit = config.weightLimit ?? WEIGHT_LIMIT_INITIAL_VALUE;
      this.weightPenalty = config.weightPenalty ?? false;
   }

   increaseAtribute(atributeCode: string, amount: number) {
      if (atributeCode in this.atributes){
         this.atributes[atributeCode] += amount;

         if (atributeCode === OrdemParanormalAtributesCodes.vigor) {
            this.recalculateHP();
         }
         else if (atributeCode === OrdemParanormalAtributesCodes.presenca) {
            this.recaulcualteEP();
         }
         else if (atributeCode === OrdemParanormalAtributesCodes.forca) {
            this.weightLimit = WEIGHT_LIMIT_INITIAL_VALUE + (this.atributes.for * WEIGHT_PER_STRENGTH);
         }
      }
   }

   addInventoryItem(item: InventoryItem): boolean {
      if ((this.inventory.currentWeight + item.size) < this.weightLimit * 2){
         const result = !!this.inventory.items.push(item);
         if (result) {
            this.verifyWeightPenalty();
         }
         return result;
      }
      return false;
   }

   removeInventoryItem(index: number): boolean {
      const result = super.removeInventoryItem(index);
      this.verifyWeightPenalty();
      return false;
   }

   private recalculateHP() {
      const healthChange = this.healthPoints.max - this.characterClass.calculateHealthPoints(this.atributes.vig, this.nex);
      this.healthPoints.max += healthChange;
      this.healthPoints.current += healthChange;
   }

   private recaulcualteEP() {
      const epChange = this.ep.max - this.characterClass.calculateEffortPoints(this.atributes.pre, this.nex);
      this.ep.max += epChange;
      this.ep.current += epChange;
   }

   private verifyWeightPenalty() {
      this.weightPenalty = this.inventory.items.reduce((acc, item) => acc + item.size, 0) > this.weightLimit;
   }
}
