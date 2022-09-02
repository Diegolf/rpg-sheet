import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OPCharacterPage } from './character.page';

const routes: Routes = [
  {
    path: '',
    component: OPCharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemParanormalCharacterPageRoutingModule {}
