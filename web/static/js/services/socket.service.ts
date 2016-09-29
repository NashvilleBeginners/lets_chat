import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Socket, Channel, SocketOptions } from 'phoenix';

@Injectable()
export class SocketService {

    socket: Socket;

    constructor(private router: Router) {
    }

    connect(token: string): Observable<any> {
        return Observable.create(observer => {
            const options: SocketOptions = {
                logger: (kind, msg, data) => console.log(`${kind}: ${msg}`, data),
                transport: WebSocket,
                params: {
                    token: token
                }
            };

            this.socket = new Socket('/socket', options);
            this.socket.onOpen(() => {
                observer.next();
            });

            this.socket.onError((err: Error) => {
                this.socket.disconnect();
                this.router.navigateByUrl('/login')
                return observer.error(err);
            });

            this.socket.connect();
        }).flatMap(() => this.joinChannel('rooms:lobby'))
    }

    joinChannel(channelName: string): Observable<any> {

    }
}
