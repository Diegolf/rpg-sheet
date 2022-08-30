import { OrdemParanormalClass, ordemParanormalClasses } from './ordem-paranormal-character-classes';
import { OrdemParanormalCharacterAtributes, OrdemParanormalAtributesCodes } from './ordem-paranormal-atributes';
import {  OrdemParanormalExpertisesCodes, OrdemParanormalExpertiseInfo } from './ordem-paranormal-expertises';
import { Character, CharacterConfigData } from '../character';

export const NEX_INITIAL_VALUE = 5;

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

   constructor(config: OrdemParanormalCharacterConfigData = {}) {
      super(config);
      this.ep = config.pe ?? {current: 0, max: 0};
      this.nex = config.nex ?? NEX_INITIAL_VALUE;
      this.characterClass = config.characterClass ?? ordemParanormalClasses[0];
      this.expertises = config.expertises ?? [];
   }

   increaseAtribute(atributeCode: string, amount: number) {
      if (atributeCode in this.atributes){
         this.atributes[atributeCode] += amount;

         if (atributeCode === OrdemParanormalAtributesCodes.vigor){
            this.recalculateHP();
         }
         else if (atributeCode === OrdemParanormalAtributesCodes.presenca){
            this.recaulcualteEP();
         }
      }
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
}
