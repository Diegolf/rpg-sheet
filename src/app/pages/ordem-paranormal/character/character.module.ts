import { ScrollingModule } from '@angular/cdk/scrolling';
import { OPExpertisesComponent } from './expertises/expertises.component';
import { OPCAtributesComponent } from './atributes/atributes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdemParanormalCharacterPageRoutingModule } from './character-routing.module';

import { OPCharacterPage } from './character.page';
import { OPClassesComponent } from './classes/classes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdemParanormalCharacterPageRoutingModule,
    ScrollingModule
  ],
  declarations: [
   OPCharacterPage,
   OPCAtributesComponent,
   OPClassesComponent,
   OPExpertisesComponent
],
  exports: [OPCAtributesComponent]
})
export class OPCharacterPageModule {}
