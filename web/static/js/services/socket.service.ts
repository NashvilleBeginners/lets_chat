import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Socket, Channel, SocketOptions } from 'phoenix';
import {DataService} from "./data.service";

@Injectable()
export class SocketService {

    socket: Socket;

    constructor(private dataService: DataService, private router: Router) {
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
                this.router.navigateByUrl('/login');
                return observer.error(err);
            });

            this.socket.connect();
        }).flatMap(() => this.joinChannel('room:lobby'))
    }

    joinChannel(channelId: string): Observable<any> {
        let channel: Channel = this.socket.channel(channelId, {});
        let dataService = this.dataService;

        return Observable.create(function (observer) {
            channel.on('new_message', payload => {
                dataService.receiveMessage(channelId, payload.body);
            });

            channel.on('current_count', payload => {
                dataService.setMessageCount(channelId, payload.body);
            });

            channel.on('whoami', payload => {
                dataService.receiveUser(payload.body);
            });

            channel.join()
                .receive('ok', resp => {
                    console.log(resp);
                })
                .receive('error', err => {
                    return observer.error(err);
                });
        });

    }

    sendMessage(channelId: string, messageType: string, body: string): Observable<any> {
        let channel = this.socket.channel(channelId, {});
        return Observable.create(function (observer) {
            channel.push(messageType, { body: body}, 10000)
                .receive('ok', (msg) => { observer.next(msg.body); })
                .receive('error', resp => { Observable.throw(new Error(resp)); });
        });
    }
}
