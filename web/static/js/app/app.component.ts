import {Component} from '@angular/core';
import {SocketService} from '../services/socket.service';

@Component({
    selector: 'app',
    template: require('./app.component.html')
})
export class AppComponent {
    socket: SocketService;

    constructor(socket: SocketService) {
        this.socket = socket;
        this.socket.connect(window.userToken);
    }
}