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
    username: Subject<string>;

    constructor() { }

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