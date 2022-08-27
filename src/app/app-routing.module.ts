import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [

   // Rota vazia
   { path: '', pathMatch: 'full', redirectTo: 'pages/dices' },

   // Rotas com layout padrão
   {
      path: '',
      component: LayoutComponent,
      children: [
         // Rota "/pages"
         {
            path: 'pages',
            children: [
               // Rota "/pages/<vazio>"
               { path: '', pathMatch: 'full', redirectTo: 'dices' },

               {
                  path: 'op-character', loadChildren: () =>
                     import('./pages/ordem-paranormal-character/ordem-paranormal-character.module')
                     .then(m => m.OrdemParanormalCharacterPageModule)
               },

               {
                  path: 'paranormal-dnd-character',
                  loadChildren: () => import('./pages/paranormal-dnd-character/character.module').then(m => m.CharacterPageModule)
               },
               {
                  path: 'paranormal-dnd-dices',
                  loadChildren: () => import('./pages/paranormal-dnd-dices/dices.module').then(m => m.DicesPageModule)
               },

               // Rota não encontrada
               { path: '**', redirectTo: 'dices' },
            ]
         },
      ]
   },

   // Rotas sem o layout padrão
   { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },

   // Rota não encontrada
   { path: '**', redirectTo: 'home' },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
