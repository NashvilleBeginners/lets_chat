import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'navbar',
    template: `
      <ul id="nav-mobile" class="side-nav fixed">
        <h2>Hello, {{username}}</h2>
        <li>
          <a [routerLink]="['']" [class.active]="isActive('/')">Home</a>
        </li>
        <li>
          <a [routerLink]="['about']" [class.active]="isActive('/about')">About</a>
        </li>
      </ul>
  `
})
export class NavBarComponent {
    @Input() username: string = "";
    constructor(public loc: Location) {}

    isActive(path: string) {
        return (this.loc.path() || '/') === path;
    }
}
