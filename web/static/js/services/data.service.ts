import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';

export interface RoomDetails {
    messages: Subject<string>,
    messageCount: Subject<number>
}

export interface RoomData {
    [channelId: string]: RoomDetails
}

@Injectable()
export class DataService {
    roomData: RoomData;
    public username: Subject<string>;
    public rooms: Subject<[string]>;

    constructor() {
        this.rooms = new Subject<[string]>();
        this.roomData = {};
        this.username = new Subject<string>();
    }

    public receiveRooms(rooms: [string]) {
        this.rooms.next(rooms);
    }

    public receiveMessage(channelId: string, message: string) {
        this.roomData[channelId].messages.next(message);
    }

    public setMessageCount(channelId: string, count: number) {
        this.roomData[channelId].messageCount.next(count);
    }

    public receiveUser(username: string) {
        this.username.next(username);
    }
}