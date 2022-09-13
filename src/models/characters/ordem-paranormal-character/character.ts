import { InventoryItem } from './../../inventory-items/inventory-item';
import { ATRIBUTE_INITIAL_VALUE } from '../character';
import { OrdemParanormalClass, ordemParanormalClasses } from './classes';
import { OrdemParanormalCharacterAtributes, OrdemParanormalAtributesCodes } from './atributes';
import {
   OrdemParanormalExpertisesCodes, OrdemParanormalExpertiseInfo,
   ordemParanormalExpertiseValueList, OrdemParanormalExpertiseInfoCodes, ordemParanormalExpertisesObject
} from './expertises';
import { Character, CharacterConfigData } from '../character';

export const NEX_INITIAL_VALUE = 1;
export const SANITY_INITIAL_VALUE = 20;
export const EP_INITIAL_VALUE = 2;
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

export interface OrdemParanormalCharacterSanity {
   current: number;
   max: number;
}

export interface OrdemParanormalCharacterConfigData extends CharacterConfigData {
   atributes?: OrdemParanormalCharacterAtributes;
   ep?: OrdemParanormalCharacterEffortPoints;
   nex?: number;
   sanity?: OrdemParanormalCharacterSanity;
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

   /** Sanidade */
   sanity: OrdemParanormalCharacterSanity;

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
      this.ep = config.ep ?? { current: EP_INITIAL_VALUE, max: EP_INITIAL_VALUE };
      this.nex = config.nex ?? NEX_INITIAL_VALUE;
      this.sanity = config.sanity ?? { current: SANITY_INITIAL_VALUE, max: SANITY_INITIAL_VALUE };
      this.characterClass = config.characterClass ?? ordemParanormalClasses[0];
      this.expertises = config.expertises ?? [
         { code: OrdemParanormalExpertisesCodes.acrobacia, info: ordemParanormalExpertiseValueList[2] },
         { code: OrdemParanormalExpertisesCodes.adestramento, info: ordemParanormalExpertiseValueList[2] },
         { code: OrdemParanormalExpertisesCodes.atletismo, info: ordemParanormalExpertiseValueList[1] },
         { code: OrdemParanormalExpertisesCodes.artes, info: ordemParanormalExpertiseValueList[3] },
         { code: OrdemParanormalExpertisesCodes.atualidades, info: ordemParanormalExpertiseValueList[2] },
         // { code: OrdemParanormalExpertisesCodes.ciencias, info: ordemParanormalExpertiseValueList[3] },
         // { code: OrdemParanormalExpertisesCodes.crime, info: ordemParanormalExpertiseValueList[1] },
         // { code: OrdemParanormalExpertisesCodes.diplomacia, info: ordemParanormalExpertiseValueList[2] },
         // { code: OrdemParanormalExpertisesCodes.enganacao, info: ordemParanormalExpertiseValueList[3] },
         // { code: OrdemParanormalExpertisesCodes.fortitude, info: ordemParanormalExpertiseValueList[1] },
         // { code: OrdemParanormalExpertisesCodes.iniciativa, info: ordemParanormalExpertiseValueList[2] },
         // { code: OrdemParanormalExpertisesCodes.intimidacao, info: ordemParanormalExpertiseValueList[3] },
         // { code: OrdemParanormalExpertisesCodes.fortitude, info: ordemParanormalExpertiseValueList[1] },
         // { code: OrdemParanormalExpertisesCodes.furtividade, info: ordemParanormalExpertiseValueList[2] },
         // { code: OrdemParanormalExpertisesCodes.iniciativa, info: ordemParanormalExpertiseValueList[3] },
         // { code: OrdemParanormalExpertisesCodes.intimidacao, info: ordemParanormalExpertiseValueList[1] },
         // { code: OrdemParanormalExpertisesCodes.intuicao, info: ordemParanormalExpertiseValueList[2] },
         // { code: OrdemParanormalExpertisesCodes.investigacao, info: ordemParanormalExpertiseValueList[1] },
         // { code: OrdemParanormalExpertisesCodes.luta, info: ordemParanormalExpertiseValueList[3] },
         // { code: OrdemParanormalExpertisesCodes.medicina, info: ordemParanormalExpertiseValueList[1] },
         // { code: OrdemParanormalExpertisesCodes.ocultismo, info: ordemParanormalExpertiseValueList[2] },
         { code: OrdemParanormalExpertisesCodes.percepcao, info: ordemParanormalExpertiseValueList[1] },
         { code: OrdemParanormalExpertisesCodes.pilotagem, info: ordemParanormalExpertiseValueList[3] },
         { code: OrdemParanormalExpertisesCodes.pontaria, info: ordemParanormalExpertiseValueList[1] },
         { code: OrdemParanormalExpertisesCodes.profissao, info: ordemParanormalExpertiseValueList[2] },
         { code: OrdemParanormalExpertisesCodes.reflexos, info: ordemParanormalExpertiseValueList[1] },
         { code: OrdemParanormalExpertisesCodes.religiao, info: ordemParanormalExpertiseValueList[3] },
         { code: OrdemParanormalExpertisesCodes.sobrevivencia, info: ordemParanormalExpertiseValueList[1] },
         { code: OrdemParanormalExpertisesCodes.tatica, info: ordemParanormalExpertiseValueList[1] },
         { code: OrdemParanormalExpertisesCodes.tecnologia, info: ordemParanormalExpertiseValueList[2] },
         { code: OrdemParanormalExpertisesCodes.vontade, info: ordemParanormalExpertiseValueList[3] },
         { code: OrdemParanormalExpertisesCodes.artes, info: ordemParanormalExpertiseValueList[1] },
      ];
      this.weightLimit = config.weightLimit ?? WEIGHT_LIMIT_INITIAL_VALUE;
      this.weightPenalty = config.weightPenalty ?? false;
   }

   changeAtribute(atributeCode: string, value: number) {
      if (atributeCode in this.atributes) {
         this.atributes[atributeCode] = value <= -1 ? -1 : value >= 5 ? 5 : value;

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

   changeExpertise(expertiseCode: OrdemParanormalExpertisesCodes, expertiseValueCode: OrdemParanormalExpertiseInfoCodes) {
      const expertiseValue = ordemParanormalExpertiseValueList.find(eValues => eValues.code === expertiseValueCode);

      const expertiseIndex = this.expertises.findIndex(e => e.code === expertiseCode);

      if (expertiseIndex !== -1) {
         this.expertises[expertiseIndex].info = expertiseValue;
      }
      else {
         const expertise = ordemParanormalExpertisesObject[expertiseCode];
         this.expertises.push({ code: expertiseCode, info: expertiseValue });
      }
   }

   addInventoryItem(item: InventoryItem): boolean {
      if ((this.inventory.currentWeight + item.size) < this.weightLimit * 2) {
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

   loadConfig(data: OrdemParanormalCharacterConfigData) {
      Object.keys(data).forEach((key) => {
         if (data[key]) {
            this[key] = data[key];
         }
      });
   }

   private recalculateHP() {
      if (this.characterClass != null) {
         const health = this.characterClass.calculateHealthPoints(this.atributes.vig, this.nex);
         this.healthPoints.max = health;
         this.healthPoints.current = health;
      }
   }

   private recaulcualteEP() {
      if (this.characterClass != null) {
         const ep = this.characterClass.calculateEffortPoints(this.atributes.pre, this.nex);
         this.ep.max = ep;
         this.ep.current = ep;
      }
   }

   private verifyWeightPenalty() {
      this.weightPenalty = this.inventory.items.reduce((acc, item) => acc + item.size, 0) > this.weightLimit;
   }
}
