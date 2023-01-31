import { Note } from "./note.interface";
import { Todo } from "./todo.interface";

export interface TodoNoteListe {
  title: string,
  date: string,
  type: string,
  content: Todo[]
}
