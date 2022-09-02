import { OPCAtributesComponent } from './atributes/atributes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdemParanormalCharacterPageRoutingModule } from './character-routing.module';

import { OPCharacterPage } from './character.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdemParanormalCharacterPageRoutingModule
  ],
  declarations: [OPCharacterPage, OPCAtributesComponent],
  exports: [OPCAtributesComponent]
})
export class OrdemParanormalCharacterPageModule {}
