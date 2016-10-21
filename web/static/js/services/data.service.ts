import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';

export interface IRoomDetails {
    messages: Subject<string>,
    messageCount: Subject<number>
}

export interface IRoomData {
    [channelId: string]: IRoomDetails
}

class RoomDetails implements IRoomDetails {
    messages: Subject<[string]>;
    messageCount: Subject<number>;

    constructor() {
        this.messages = new Subject<[string]>();
        this.messageCount = new Subject<number>();
    }
}

@Injectable()
export class DataService {
    private roomData: IRoomData;
    public username: Subject<string>;
    public rooms: Subject<[string]>;

    constructor() {
        this.rooms = new Subject<[string]>();
        this.username = new Subject<string>();
        this.roomData = {};
    }

    public receiveRooms(rooms: [string]) {
        this.rooms.next(rooms);
    }

    public getRoom(channelId) {
        if(!this.roomData[channelId]) {
            this.roomData[channelId] = new RoomDetails();
        }

        return this.roomData[channelId];
    }

    public receiveMessage(channelId: string, message: string) {
        let room = this.getRoom(channelId);
        room.messages.next(message);
    }

    public setMessageCount(channelId: string, count: number) {
        let room = this.getRoom(channelId);
        room.messageCount.next(count);
    }

    public receiveUser(username: string) {
        this.username.next(username);
    }
}