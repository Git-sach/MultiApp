import { Note } from "./note.interface";
import { Todo } from "./todo.interface";

export interface TodoNote {
  title: string,
  date: string,
  type: string,
  content: Todo[]
}
