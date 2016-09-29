import "jquery";
import "phoenix_html";
import "reflect-metadata";
import 'es6-shim';
import 'es6-promise';
import "hammerjs";
import 'zone.js/dist/zone';
import '@angular/compiler';
import '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import 'rxjs';
import "materialize-css";
import "angular2-materialize";

if ('production' === 'BRUNCH_ENVIRONMENT') {
    enableProdMode();
}
