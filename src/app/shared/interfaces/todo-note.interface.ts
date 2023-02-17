import { Note } from "./note.interface";
import { Todo } from "./todo.interface";

export interface TodoNote {
  title: string,
  date: string,
  type: 'todo' | 'note',
  content: Todo[] | Note
}
