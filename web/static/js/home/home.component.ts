import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'home',
    styles: [require('./home.component.css')],
    template: require('./home.component.html')
})
export default class HomeComponent implements OnInit {
    public title: any;
    public room: string;
    constructor(private route: ActivatedRoute) {
        this.title = { value: 'Angular 2' };
        this.route.params.subscribe((params) => this.room = params.room)
    }

    ngOnInit() {
    }
}