import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';

interface ChannelDetails {
    messages: Subject<string[]>,
    messsageCount: Subject<number>
}

interface ChannelData {
    [index: string]: ChannelDetails
}

@Injectable()
export class DataService {
    channelData: ChannelData;

    constructor() { }

    public receiveAlertMessage(message: string) {
        this.alertMessage$.next(message);
    }

    public setCurrentCount(count: number) {
        this.currentCount$.next(count);
    }
}