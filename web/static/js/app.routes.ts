import {Routes, RouterModule} from '@angular/router';

import {Home} from './home';
import {About} from './about';
import {Login} from './login';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'about', component: About},
    {path: 'login', component: Login}
];

export const routing = RouterModule.forRoot(routes);