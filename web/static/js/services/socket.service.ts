import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs/Observable';
import { Socket, Channel, SocketOptions } from 'phoenix';
import {DataService} from "./data.service";

export interface Channels {
    [channelId: string]: Channel
}

@Injectable()
export class SocketService {

    socket: Socket;
    channels: Channels;

    constructor(public dataService: DataService, private router: Router) {
        this.channels = {};
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
        }).flatMap(() => this.joinChannel('room:lobby'));
    }

    joinChannel(channelId: string): Observable<any> {
        let channel: Channel;

        return Observable.create(o => {
            if(this.channels[channelId]) {
                channel = this.channels[channelId];
            } else {
                channel = this.socket.channel(channelId);
                this.channels[channelId] = channel;
                channel.join()
                    .receive('ok', () => o.next())
                    .receive('error', err => o.error(err));
            }
        });
    }

    sendWhoAmI() {
       this.sendMessage("room:lobby", "whoami", "")
            .filter(r => { return r.username })
            .pluck("username")
            .subscribe(username => {
                this.dataService.receiveUser(username)
            });
    }

    sendGetRooms() {
        this.sendMessage("room:lobby", "get_rooms", "")
            .pluck("rooms")
            .subscribe(rooms => this.dataService.receiveRooms(rooms))
    }

    sendMessage(channelId: string, messageType: string, body: string): Observable<any> {
        let channel = this.channels[channelId];
        return Observable.create(function (observer) {
            channel.push(messageType, { body: body}, 10000)
                .receive('ok', (msg) => { observer.next(msg); })
                .receive('error', resp => { Observable.throw(new Error(resp)); });
        });
    }
}
