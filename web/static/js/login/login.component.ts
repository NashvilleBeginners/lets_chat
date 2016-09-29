import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'login',
    template: require('./login.component.html')
})
export default class LoginComponent implements OnInit, OnDestroy {
    constructor() {
    }

    ngOnInit() { console.log('About::ngOnInit'); }
    ngOnDestroy() { console.log('About::ngOnDestroy'); }
}