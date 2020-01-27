import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { IconService } from "@ant-design/icons-angular";
import { CheckOutline } from "@ant-design/icons-angular/icons";

import { Todo } from "../../interfaces/todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit {
  @ViewChild("formTask", { static: true }) formTask: NgForm;
  task: Todo;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private _iconService: IconService
  ) {
    this._iconService.addIcon(...[CheckOutline]);
  }

  ngOnInit() {
    this.task = {
      id: "",
      title: "",
      isDone: false
    };
  }

  handleSubmit(): void {
    if (this.formTask.form.valid) {
      this.todoService.addTask(this.task);
      this.router.navigate(["/todos"]);
    }
  }
}
