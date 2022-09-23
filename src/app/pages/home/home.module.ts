import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { OPCharacterPageModule } from '../ordem-paranormal/character/character.module';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      HomePageRoutingModule,
      OPCharacterPageModule
   ],
   declarations: [HomePage]
})
export class HomePageModule { }
