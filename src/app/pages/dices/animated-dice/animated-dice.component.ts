import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-dice',
  templateUrl: './animated-dice.component.html',
  styleUrls: ['./animated-dice.component.scss'],
})
export class AnimatedDiceComponent implements OnInit {

   @Input() resultado;

  constructor() { }

  ngOnInit() {}

}
