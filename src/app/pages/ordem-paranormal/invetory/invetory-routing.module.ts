import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvetoryPage } from './invetory.page';

const routes: Routes = [
  {
    path: '',
    component: InvetoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvetoryPageRoutingModule {}
