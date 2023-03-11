import { Pipe, PipeTransform } from '@angular/core';
import { TodoNote } from '../interfaces/todo-note.interface';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: TodoNote[], search: string ): TodoNote[] {
    return value.filter((value: TodoNote) => {
      return value.title.toUpperCase().includes(search.toLocaleUpperCase());
    })
  }
}
