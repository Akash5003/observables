import { Component } from '@angular/core';
import { interval, Observable, take } from 'rxjs'; /// for creating new observable
import { of } from 'rxjs';  // for creating a observable by 'of'  operator.
import { from } from 'rxjs'; //for creating a Observable by 'from'  operator.
import { map} from 'rxjs';//for map the operators etcc..
import { filter } from 'rxjs';// for filter operator.
import { mergeMap } from 'rxjs';//merge two or more pipes.

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent {
}

///Creating a new  Observable
const myObservable = new Observable<string>(subscriber => {
  subscriber.next('Hello');
  subscriber.next('World');
  subscriber.complete(); ///complete method proceeds no more data will be emitted
  subscriber.next('it is declared after complete method') // this data will not in output.
});

// Subscribe to the Observable
myObservable.subscribe({
  next: value => console.log(value),   // Handling the each emitted value
  error: err => console.error(err),    // Handling the errors(optional)
  complete: () => console.log('Done') ///  To intimate completion
});
////////by using observer/////////
const observer={                             //// Consumes the data or events emitted by an Observable.
  next: (value:string) => console.log(value),   
  error: (err:any) => console.error(err),    
  complete: () => console.log('Done')
}
myObservable.subscribe(observer)

//creating observables by 'of' Operator

const numbers= of(1, 2, 3, 4, 5);
numbers.subscribe(value => console.log(value)); 

//creating observables by 'from' Operator
const array = from([10, 20, 30]);
array.subscribe(value => console.log(value)); 

////////////////////////////////OPERATORS///////////////
const ThreeTable = of(1,2,3,4,5,6,7,8,9,10);
ThreeTable.pipe(

map(value => value*3) ,       /////map operators.

).subscribe(output=>console.log(output));

ThreeTable.pipe(
  filter(value=>value%2===0)  ///filter operators.
).subscribe(output => console.log(output)); 


ThreeTable.pipe(
  mergeMap(value => interval(4000).pipe(take(3), map(() => value * 10))) /// merging two pipes by Mergemap.
).subscribe(value => console.log(value));
 



