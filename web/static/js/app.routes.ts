import {Routes, RouterModule} from '@angular/router';

import {Home} from './home';
import {About} from './about';
import {Login} from './login';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/rooms/lobby'},
    {path: 'rooms/:room', component: Home, pathMatch: 'full'},
    {path: 'login', component: Login}
];

export const routing = RouterModule.forRoot(routes);