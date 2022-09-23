import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OPDicesPage } from './dices.page';

const routes: Routes = [
  {
    path: '',
    component: OPDicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DicesPageRoutingModule {}
