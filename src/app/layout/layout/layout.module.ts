import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './../../app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
      LayoutComponent
    ],
    exports: [
      LayoutComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      AppRoutingModule,
      BrowserModule
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class LayoutModule { }
