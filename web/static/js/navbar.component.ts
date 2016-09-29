import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'navbar',
    template: `
      <ul id="nav-mobile" class="side-nav fixed">
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
    constructor(public loc: Location) {}

    isActive(path: string) {
        return (this.loc.path() || '/') === path;
    }
}
