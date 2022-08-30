import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdemParanormalCharacterPageRoutingModule } from './ordem-paranormal-character-routing.module';

import { OrdemParanormalCharacterPage } from './ordem-paranormal-character.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdemParanormalCharacterPageRoutingModule
  ],
  declarations: [OrdemParanormalCharacterPage]
})
export class OrdemParanormalCharacterPageModule {}
