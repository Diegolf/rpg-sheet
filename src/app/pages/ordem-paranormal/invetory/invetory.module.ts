import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvetoryPageRoutingModule } from './invetory-routing.module';

import { InvetoryPage } from './invetory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvetoryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InvetoryPage]
})
export class OPInvetoryPageModule {}
