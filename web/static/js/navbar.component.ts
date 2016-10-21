import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'navbar',
    template: `
      <ul id="nav-mobile" class="side-nav fixed">
        <h2>Hello, {{username}}</h2>
        <li *ngFor="let room of rooms">
          <a routerLink="/rooms/{{room}}" routerLinkActive="active">{{room}}</a>
        </li>
      </ul>
  `
})
export class NavBarComponent {
    @Input() username: string = "";
    @Input() rooms: [string] = [];
    constructor(public loc: Location) {}
}
