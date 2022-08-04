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

   @Input() dicesResultList: [RollResult];
   @Input() dice: Dice;

   readonly countdown$ = new Subject<void>().pipe(
      startWith(0),
      switchMapTo(this.countdownFrom(30))
   );

   private readonly repeatRandomValueTimes = 30;

   constructor(public modalCtrl: ModalController) { }

   ngOnInit() { }

   countdownFrom(start: number): Observable<number> {
      return timer(500, 100).pipe(
         map((value, index) => {
            const current = start - index;
            return current === 0 ? 55 : current;
         }),
         takeWhile<number>((value, index) => index !== this.repeatRandomValueTimes, true)
      );
   }

}
