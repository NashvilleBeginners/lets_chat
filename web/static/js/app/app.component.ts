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
    rooms: [string] = [];

    constructor(public socketService: SocketService, public dataService: DataService) {
        this.socketService.connect(window.userToken).subscribe(() => {
            this.socketService.sendWhoAmI();
            this.socketService.sendGetRooms();
        });

        this.dataService.username.subscribe(username => this.username = username);
        this.dataService.rooms.subscribe(rooms => this.rooms = rooms);
    }
}