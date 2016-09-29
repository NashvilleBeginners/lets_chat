import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {routing} from './app.routes';
import {HttpModule} from '@angular/http';
import {Home} from './home';
import {About} from './about';
import {Login} from './login';
import {NavBarComponent} from './navbar.component';
import { MaterializeModule } from 'angular2-materialize';
import "materialize-css";
import { SocketService } from './services/socket.service';
import {AppComponent} from './app/app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        MaterializeModule
    ],
    declarations: [
        AppComponent,
        Home,
        About,
        Login,
        NavBarComponent
    ],
    providers: [SocketService],
    bootstrap: [AppComponent]
})
export class AppModule {}