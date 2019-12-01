import { Component, OnInit } from "@angular/core";
import { Todo } from "../Todo";
import { Observable, empty } from "rxjs";
import { catchError } from "rxjs/operators";

import { TodoService } from "../todo.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-todos-main",
  templateUrl: "./todos-main.component.html",
  styleUrls: ["./todos-main.component.sass"]
})
export class TodosMainComponent implements OnInit {
  todos$: Observable<Todo[]>;
  auxTodos: {};
  form: FormGroup;
  setState: false;
  filtro: "all";

  constructor(private service: TodoService, private fb: FormBuilder) {}

  //ngOnInit() {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      todo: [null],
      status: [null]
    });
    this.onRefresh();
  }

  onRefresh() {
    this.filtro = "all";
    this.todos$ = this.service.list().pipe(
      catchError(error => {
        console.error(error);
        console.log("Erro ao carregar.");
        return empty();
      })
    );

    this.todos$.subscribe(
      data => {
        this.auxTodos = data;
      },
      error => console.log("Subscribe error.")
    );
  }

  saveForm(formData) {
    console.log(formData);
    if (formData.valid) {
      if (formData.value.status == null) {
        formData.value.status = false;
      }
      this.service.save(formData.value).subscribe(
        sucess => {
          console.log("salvo");
        },
        error => console.log("erro"),
        () => {
          console.log("finalizado");
          this.onRefresh();
          this.onCancel();
        }
      );
    }
  }

  onSubmit() {
    this.saveForm(this.form);
  }

  onEdit(todo) {
    this.form.patchValue({
      id: todo.id,
      todo: todo.todo
    });
    this.setState = todo.status;
  }

  onCancel() {
    this.form.reset();
  }

  onDelete(todo) {
    this.service.delete(todo.id).subscribe(
      sucess => {
        console.log("deleted");
        this.ngOnInit();
      },
      error => console.log("Error on delete.")
    );
  }

  onCheck(todo, check) {
    console.log(check.checked);
    let formCheck = this.fb.group({
      id: [null],
      todo: [null],
      status: [null]
    });

    formCheck.patchValue({
      id: todo.id,
      todo: todo.todo,
      status: check.checked
    });

    this.saveForm(formCheck);
  }

  deleteAll(done) {
    for (let key in this.auxTodos) {
      let todo = this.auxTodos[key];
      if (done && todo.status) {
        this.onDelete(todo);
      } else if (!done) {
        this.onDelete(todo);
      }
    }
  }

  fcFiltro(todo) {
    if (this.filtro == "all") {
      return true;
    } else if (this.filtro == "done") {
      return todo.status;
    } else if (this.filtro == "notdone") {
      return !todo.status;
    }
  }
}
