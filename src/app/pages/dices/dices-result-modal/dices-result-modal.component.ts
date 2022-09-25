import { CharacterAtributes } from './../../../../models/characters/character';
import { RollResult, Dice } from './../../../../models/dices/dices';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, timer } from 'rxjs';
import { map, startWith, switchMapTo, take, takeWhile } from 'rxjs/operators';

export enum RollOperation {
   none = 0,
   sumResult = 1,
   greaterResult = 2,
   lowestResult = 3
}

export const rollOperations = [
   { id: RollOperation.none, title: 'Nada' },
   { id: RollOperation.sumResult, title: 'Somar Resultado' },
   { id: RollOperation.greaterResult, title: 'Maior Resultado' },
   { id: RollOperation.lowestResult, title: 'Menor Resultado' },
];

@Component({
   selector: 'app-dices-result-modal',
   templateUrl: './dices-result-modal.component.html',
   styleUrls: ['./dices-result-modal.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class DicesResultModalComponent implements OnInit {

   @Input() atributes: CharacterAtributes;
   @Input() dice: Dice;
   @Input() times: number;
   @Input() rollOperation: RollOperation = RollOperation.none;

   public resultList;
   public finalResult = 0;
   public showFinalResult = false;

   private readonly repeatRandomValueTimes = 30;
   private teste = new Subject<number>();

   constructor(public modalCtrl: ModalController) { }

   ngOnInit() {
      this.resultList = Array.from({ length: this.times }, () => new Subject<void>().pipe(
         startWith(1),
         switchMapTo(this.generateRandomResults())
      ));
      this.handleRollResult();
   }

   generateRandomResults(): Observable<RollResult> {
      return timer(500, 100).pipe(
         map((_value, index) => {
            const lastOne = index === this.repeatRandomValueTimes;
            const result = this.dice.roll(this.atributes);

            if (lastOne) {
               this.teste.next(result.value);
            }

            return ({ ...result });
         }),
         takeWhile<RollResult>((_value, index) => index !== this.repeatRandomValueTimes, true)
      );
   }

   private handleRollResult() {
      if (this.rollOperation === RollOperation.lowestResult) {
         this.finalResult = 999;
      }

      this.teste.pipe(take(this.times)).subscribe(
         (valor) => {
            switch (this.rollOperation) {
               case (RollOperation.sumResult): this.finalResult += valor; break;
               case (RollOperation.greaterResult): this.finalResult = valor > this.finalResult ? valor : this.finalResult; break;
               case (RollOperation.lowestResult): this.finalResult = valor < this.finalResult ? valor : this.finalResult; break;
               case (RollOperation.none): default: break;
            }
         },
         () => { },
         () => {
            if (this.rollOperation !== RollOperation.none && this.times > 1) {
               this.showFinalResult = true;
            }
         }
      );
   }

}
