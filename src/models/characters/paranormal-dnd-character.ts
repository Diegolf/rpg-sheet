import { InventoryItem } from '../inventory-items/inventory-item';
import {
   CharacterAtributes, Character, CharacterInventory, CharacterHealthPoints,
   HP_INITIAL_VALUE, ATRIBUTE_INITIAL_VALUE, INVENTORY_LIMIT, CharacterConfigData, CharacterAtributeInfo
} from './character';


export interface ParanormalDNDCharacterAtributes extends CharacterAtributes {
   agi: number;
   vig: number;
   dex: number;
   int: number;
}

export const paranormalDNDCharacterAtributesInfo: CharacterAtributeInfo[] = [
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

export interface ParanormalDNDCharacterConfigData extends CharacterConfigData {
   atributes?: ParanormalDNDCharacterAtributes;
   remainingAtributes?: number;
}

export class ParanormalDNDCharacter extends Character {
   name: string;
   imageUrl?: string;
   healthPoints: CharacterHealthPoints;
   inventory: CharacterInventory;
   atributes: ParanormalDNDCharacterAtributes;

   constructor(config: ParanormalDNDCharacterConfigData = {}) {
      super(config);
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
}
