import { InventoryItem } from './../../inventory-items/inventory-item';
import { ATRIBUTE_INITIAL_VALUE, HP_INITIAL_VALUE } from '../character';
import { OrdemParanormalClass, ordemParanormalClasses } from './classes';
import { OrdemParanormalCharacterAtributes, OrdemParanormalAtributesCodes } from './atributes';
import {
   OrdemParanormalExpertisesCodes, OrdemParanormalExpertiseInfo,
   ordemParanormalExpertiseValueList, OrdemParanormalExpertiseInfoCodes, ordemParanormalExpertises
} from './expertises';
import { Character, CharacterConfigData } from '../character';

export const NEX_INITIAL_VALUE = 1;
export const SANITY_INITIAL_VALUE = 20;
export const EP_INITIAL_VALUE = 2;
export const WEIGHT_LIMIT_INITIAL_VALUE = 5;
export const WEIGHT_PER_STRENGTH = 5;
export const DEFENSE_INITIAL_VALUE = 10;

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
   defense?: number;
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

   /** Defesa do personagem */
   defense: number;

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
      this.nex = config.nex ?? NEX_INITIAL_VALUE;
      this.characterClass = config.characterClass ?? ordemParanormalClasses[0];
      this.expertises = config.expertises ?? [];
      this.healthPoints = config.healthPoints ?? { current: HP_INITIAL_VALUE, max: HP_INITIAL_VALUE };
      this.ep = config.ep ?? { current: EP_INITIAL_VALUE, max: EP_INITIAL_VALUE };
      this.sanity = config.sanity ?? { current: SANITY_INITIAL_VALUE, max: SANITY_INITIAL_VALUE };
      this.defense = config.defense ?? DEFENSE_INITIAL_VALUE;
      this.weightLimit = config.weightLimit ?? WEIGHT_LIMIT_INITIAL_VALUE;
      this.weightPenalty = config.weightPenalty ?? false;

      // if (config.ep) {
      //    this.ep = config.ep;
      // }
      // else {
      //    const ep = this.characterClass.calculateEffortPoints(this.atributes.pre, this.nex);
      //    this.ep = { current: ep, max: ep };
      // }

      // if (config.sanity) {
      //    this.sanity = config.sanity;
      // }
      // else {
      //    const sanity = this.characterClass.calculateSanity(this.nex);
      //    this.sanity = { current: sanity, max: sanity };
      // }
   }

   changeClass(opClass: OrdemParanormalClass) {
      this.characterClass = opClass;
      this.recalculateHP(true);
      this.recalculateEP(true);
      this.recalculateSanity(true);
      this.verifyWeightPenalty();
   }

   changeAtribute(atributeCode: string, value: number) {
      if (atributeCode in this.atributes) {
         this.atributes[atributeCode] = value <= -1 ? -1 : value >= 5 ? 5 : value;

         if (atributeCode === OrdemParanormalAtributesCodes.vigor) {
            this.recalculateHP();
         }
         else if (atributeCode === OrdemParanormalAtributesCodes.presenca) {
            this.recalculateEP();
         }
         else if (atributeCode === OrdemParanormalAtributesCodes.forca) {
            this.recalculateWeightLimit(value);
            this.verifyWeightPenalty();
         }
         else if (atributeCode === OrdemParanormalAtributesCodes.agilidade) {
            this.recalculateDefense();
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
         this.expertises.push({ code: expertiseCode, info: expertiseValue });
      }
   }

   changeEffortByamout(amount: number) {
      const total = this.ep.current + amount;

      // Permite ultrapassar o máximo porque algumas skills podem ter esse efeito
      this.ep.current = total < 0 ? 0 : total;
   }

   changeSanityByAmount(amount: number) {
      const total = this.sanity.current + amount;

      // Permite ultrapassar o máximo porque algumas skills podem ter esse efeito
      this.sanity.current = total < 0 ? 0 : total;
   }

   changeNex(value: number) {
      this.nex = value < 0 ? 0 : (value > 20 ? 20 : value);
      this.recalculateEP();
      this.recalculateHP();
      this.recalculateSanity();
   }

   addInventoryItem(item: InventoryItem): boolean {
      if ((this.inventory.currentWeight + item.size) <= this.weightLimit * 2) {
         const result = !!this.inventory.items.push(item);
         if (result) {
            this.verifyWeightPenalty();
            this.recalculateDefense();
         }
         return result;
      }
      return false;
   }

   removeInventoryItem(index: number): boolean {
      const result = super.removeInventoryItem(index);
      if (result) {
         this.recalculateDefense();
         this.verifyWeightPenalty();
      }
      return result;
   }

   changeInventoryItem(index: number, props: InventoryItem) {
      const item = this.inventory.items[index];
      Object.keys(props).forEach(key => {
         if (item[key] != null) {
            if (key === 'size') {
               if (props.size < 0) {
                  props.size = 0;
               }
               else if ((this.inventory.currentWeight + props.size - item.size) > this.weightLimit * 2) {
                  return;
               }
            }
            item[key] = props[key];
         }
      });
      this.recalculateDefense();
      this.verifyWeightPenalty();
   }

   loadConfig(data: any, recalculateInfo: boolean = false) {
      Object.keys(data).forEach((key) => {
         if (data[key] != null) {
            switch (key) {
               case 'characterClass': {
                  this.characterClass = ordemParanormalClasses.find(c => c.code === data[key]) || ordemParanormalClasses[0];
                  break;
               }
               case 'expertises': {
                  this.expertises = data[key].map(expertiseData => {
                     const expertise = ordemParanormalExpertises.find(e => e.code === expertiseData.code);
                     const info = ordemParanormalExpertiseValueList.find(i => i.code === expertiseData.infoCode);
                     if (expertise && info) {
                        return { code: expertise.code, info } as OrdemParanormalCharacterExpertise;
                     }
                     return null;
                  }).filter(e => e);
                  break;
               }
               default: {
                  this[key] = data[key];
                  break;
               }
            }
         }
      });

      if (recalculateInfo) {
         this.recalculateHP();
         this.recalculateEP();
         this.recalculateSanity();
         this.recalculateWeightLimit(this.atributes.for);
         this.verifyWeightPenalty();
         this.recalculateDefense();
      }
   }

   getConfig(dataKeys: string[]) {
      const dadosFormatados = {};

      dataKeys.forEach(key => {
         if (this[key]) {
            switch (key) {
               case 'characterClass': {
                  dadosFormatados[key] = this.characterClass.code;
                  break;
               }
               case 'expertises': {
                  dadosFormatados[key] = this.expertises.map(e => ({ code: e.code, infoCode: e.info.code }));
                  break;
               }
               default: {
                  dadosFormatados[key] = this[key];
                  break;
               }
            }
         }
      });

      return dadosFormatados;
   }

   private recalculateHP(reset: boolean = false) {
      if (this.characterClass != null) {
         const newHealth = this.characterClass.calculateHealthPoints(this.atributes.vig, this.nex);
         this.healthPoints.current = reset ? newHealth : (this.healthPoints.current + newHealth - this.healthPoints.max);
         this.healthPoints.max = newHealth;
      }
   }

   private recalculateEP(reset: boolean = false) {
      if (this.characterClass != null) {
         const newEp = this.characterClass.calculateEffortPoints(this.atributes.pre, this.nex);
         this.ep.current = reset ? newEp : (this.ep.current + newEp - this.ep.max);
         this.ep.max = newEp;
      }
   }

   private recalculateSanity(reset: boolean = false) {
      if (this.characterClass != null) {
         const newSanity = this.characterClass.calculateSanity(this.nex);
         this.sanity.current = reset ? newSanity : (this.sanity.current + newSanity - this.sanity.max);
         this.sanity.max = newSanity;
      }
   }

   private recalculateWeightLimit(forceAtributeValue: number) {
      this.weightLimit = WEIGHT_LIMIT_INITIAL_VALUE + (forceAtributeValue * WEIGHT_PER_STRENGTH);
   }

   private verifyWeightPenalty() {
      this.inventory.currentWeight = this.inventory.items.reduce((acc, item) => acc + item.size, 0);
      this.weightPenalty = this.inventory.currentWeight > this.weightLimit;
   }

   private recalculateDefense() {
      const equipmentDefenseModifier = this.inventory.items.reduce((acc, item) => {
         const match = item.description.match(/#DEF([+-])(\d{1,2})/);
         if (match) {
            if (match[1] === '+') {
               acc += parseInt(match[2], 10);
            }
            else {
               acc -= parseInt(match[2], 10);
            }
         }
         return acc;
      }, 0);
      const defense = DEFENSE_INITIAL_VALUE + this.atributes.agi + equipmentDefenseModifier;
      this.defense = defense < 0 ? 0 : defense;
   }
}
