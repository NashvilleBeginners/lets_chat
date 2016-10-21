import {Component, OnInit, AfterViewChecked, ElementRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../services/data.service";
import {SocketService} from "../services/socket.service";
import {ViewChild} from "@angular/core";

@Component({
    selector: 'home',
    styles: [require('./home.component.css')],
    template: require('./home.component.html')
})
export default class HomeComponent implements OnInit, AfterViewChecked {
    @ViewChild('messagesContainer') private messagesContainer: ElementRef;

    public room: string;
    public message: string;
    public messages: [string];
    public channelId: string;

    constructor(private route: ActivatedRoute, private dataService: DataService, private socketService: SocketService) {
        this.messages = [];

        this.route.params.subscribe((params) => {
            this.room = params.room;
            let channelId: string = `rooms:${this.room}`;
            this.channelId = channelId;

            this.socketService
                .joinChannel(channelId)
                .subscribe(msg => {
                    this.socketService.sendGetMessages(channelId);
                });


            this.dataService.getRoom(channelId).messages.subscribe((value) => {
                this.message = "";
                if (value instanceof Array) {
                    this.messages = value;
                } else {
                    this.messages.push(value);
                }
            });
        })
    }

    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

    sendMessage(message) {
        this.socketService.sendMessage(this.channelId, "new_msg", message).subscribe();
    }
}