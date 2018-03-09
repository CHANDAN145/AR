import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Discrepancy } from 'app/app.model';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'discripancyFilter'
})

@Injectable()

export class DiscripancyFilterPipe {
    name:string;
    
  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(items:Discrepancy[], field: string) {
    // ES6 array destructuring
    //let search = args;
    return items.filter(discripancy => {
        return discripancy.Name.includes(field) || discripancy.NTPL_ID.includes(field) || discripancy.TaskName.includes(field) || discripancy.Date.includes(field);
        //return person.age >= +minAge;
    });
  }

}