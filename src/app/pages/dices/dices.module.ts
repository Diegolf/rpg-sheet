import { DicesResultModalComponent } from './dices-result-modal/dices-result-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DicesPageRoutingModule } from './dices-routing.module';

import { DicesPage } from './dices.page';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      DicesPageRoutingModule
   ],
   declarations: [
      DicesPage,
      DicesResultModalComponent
   ]
})
export class DicesPageModule { }
