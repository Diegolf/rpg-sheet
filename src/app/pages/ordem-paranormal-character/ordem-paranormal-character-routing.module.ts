import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdemParanormalCharacterPage } from './ordem-paranormal-character.page';

const routes: Routes = [
  {
    path: '',
    component: OrdemParanormalCharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemParanormalCharacterPageRoutingModule {}
