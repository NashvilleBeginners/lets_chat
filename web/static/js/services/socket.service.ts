import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription} from 'rxjs/Observable';
import { Socket, Channel, SocketOptions } from 'phoenix';
import {DataService} from "./data.service";

export interface Observers {
    [channelId: string]: Observable<Channel>;
}

export interface Channels {
    [channelId: string]: Channel;
}

@Injectable()
export class SocketService {

    socket: Socket;
    channels: Channels;
    observers: Observers;

    constructor(public dataService: DataService, private router: Router) {
        this.channels = {};
        this.observers = {};
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
        });
    }

    joinChannel(channelId: string): Observable<any> {
        if(!this.observers[channelId]) {
            let channel = this.socket.channel(channelId);

            this.channels[channelId] = channel;
            this.observers[channelId] = Observable.create(o => {
                channel.on("new_msg", res => {
                    this.dataService.getRoom(channelId).messages.next(res);
                    o.next(res);
                });

                if(channel.state != "joined") {
                    this.channels[channelId].join()
                        .receive('ok', res => o.next(res))
                        .receive('error', err => o.error(err));
                } else {
                    o.next();
                }
            });
        }

        return this.observers[channelId];
    }

    sendWhoAmI() {
       this.sendMessage("rooms:lobby", "whoami", "")
            .filter(r => { return r.username })
            .pluck("username")
            .subscribe(username => {
                this.dataService.receiveUser(username)
            });
    }

    sendGetRooms() {
        this.sendMessage("rooms:lobby", "get_rooms", "")
            .pluck("rooms")
            .subscribe(rooms => this.dataService.receiveRooms(rooms))
    }

    sendGetMessages(channelId: string) {
        this.sendMessage(channelId, "get_messages", "").pluck("messages").subscribe(message => {
            this.dataService.receiveMessage(channelId, message);
        });
    }

    sendMessage(channelId: string, messageType: string, body: string): Observable<any> {
        let channel = this.channels[channelId];
        return Observable.create(function (observer) {
            channel.push(messageType, { body: body}, 10000)
                .receive('ok', (msg) => {
                    observer.next(msg);
                })
                .receive('error', resp => {
                    Observable.throw(new Error(resp));
                });
        });
    }
}
