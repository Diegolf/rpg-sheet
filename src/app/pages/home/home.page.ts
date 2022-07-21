import { Component, OnInit } from '@angular/core';
import { OrdemRPGCharacter } from 'src/models/characters/ordem-rpg-character';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    let character: OrdemRPGCharacter = new OrdemRPGCharacter(20,{},{});
  }

}