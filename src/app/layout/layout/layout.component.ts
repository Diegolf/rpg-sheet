import { Component, OnInit } from '@angular/core';
import { mainMenuRoutesMock } from 'src/app/mocks/main-menu-routes';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  public rotas = mainMenuRoutesMock;

  constructor() { }

  ngOnInit() {}

}
