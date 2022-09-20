import { OPLayoutComponent } from './layout/ordem-paranormal-layout/layout.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [

   // Rota vazia
   { path: '', pathMatch: 'full', redirectTo: 'pages/dices' },

   // Rotas com layout padrão
   {
      path: '',
      component: OPLayoutComponent,
      children: [
         // Rota "/pages"
         {
            path: 'pages',
            children: [
               // Rota "/pages/<vazio>"
               { path: '', pathMatch: 'full', redirectTo: 'dices' },
               {
                  path: 'character',
                  loadChildren: () => import('./pages/ordem-paranormal/character/character.module').then(m => m.OPCharacterPageModule)
               },
               { path: 'dices', loadChildren: () => import('./pages/ordem-paranormal/dices/dices.module').then(m => m.OPDicesPageModule) },
               {
                 path: 'inventory',
                 loadChildren: () => import('./pages/ordem-paranormal/invetory/invetory.module').then( m => m.OPInvetoryPageModule)
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
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
