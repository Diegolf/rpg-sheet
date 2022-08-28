import { ParanormalDNDCharacterAtributes } from '../../../../models/characters/paranormal-dnd-character';
import { RollResult, Dice } from './../../../../models/dices/dices';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, timer } from 'rxjs';
import { map, startWith, switchMapTo, takeWhile } from 'rxjs/operators';

@Component({
   selector: 'app-dices-result-modal',
   templateUrl: './dices-result-modal.component.html',
   styleUrls: ['./dices-result-modal.component.scss'],
})
export class DicesResultModalComponent implements OnInit {

   @Input() atributes: ParanormalDNDCharacterAtributes;
   @Input() dice: Dice;
   @Input() times: number;

   public resultList;
   private readonly repeatRandomValueTimes = 30;

   constructor(public modalCtrl: ModalController) { }

   ngOnInit() {
      this.resultList = Array.from({ length: this.times }, () => new Subject<void>().pipe(
         startWith(1),
         switchMapTo(this.generateRandomResults())
      ));
   }

   generateRandomResults(): Observable<RollResult> {
      return timer(500, 100).pipe(
         map((_value, index) => ({ ...this.dice.roll(this.atributes), lastOne: index === this.repeatRandomValueTimes })),
         takeWhile<RollResult>((_value, index) => index !== this.repeatRandomValueTimes, true)
      );
   }
}
