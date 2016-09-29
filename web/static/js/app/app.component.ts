import {Component} from '@angular/core';
import {SocketService} from '../services/socket.service';
import {Observable} from "rxjs";
import {DataService} from "../services/data.service";

@Component({
    selector: 'app',
    template: require('./app.component.html')
})
export class AppComponent {
    username: string;

    constructor(private socketService: SocketService, private dataService: DataService) {
        this.socketService = socketService;
        this.dataService.username.subscribe(username => this.username = username);
    }
}