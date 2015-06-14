/// <reference path="../typings/angular2/angular2.d.ts" />
//import 'zone.js';
//import 'reflect-metadata';
//this makes bundle fat :(

import {bootstrap} from 'angular2/angular2';
import {SeedApp} from './components/SeedApp';

export function run(){
    
    console.log('bootstrapping...');
    return bootstrap(SeedApp,[]);



}

console.timeEnd('ready');
console.time('bootstrap');

run().then(() => {
    console.timeEnd('bootstrap');
    console.timeEnd('all');
});