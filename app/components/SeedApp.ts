/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, EventEmitter} from 'angular2/angular2';

export class Foo {
  constructor(){
    console.log('bar!')
  }
  sayHello(name:string = 'dave'){
    console.log(`hello, {name}`);
  }
}


@Component({
  selector: 'seed-app',
  appInjector: [Foo]
})
@View({
  template: '<h1>hello world</h1>'
})
export class SeedApp {
  constructor(private foo: Foo){
    console.log('hello world');
  }
}
