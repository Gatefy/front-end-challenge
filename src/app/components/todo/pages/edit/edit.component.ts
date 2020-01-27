import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import { IconService } from "@ant-design/icons-angular";
import { CheckOutline } from "@ant-design/icons-angular/icons";

import { Todo } from "../../interfaces/todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
  @ViewChild("formTask", { static: true }) formTask: NgForm;
  task: Todo;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    private _iconService: IconService
  ) {
    this._iconService.addIcon(...[CheckOutline]);
  }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    this.task = this.todoService.loadById(id);
  }

  handleSubmit(): void {
    if (this.formTask.form.valid) {
      this.todoService.updateTask(this.task);
      this.router.navigate(["/todos"]);
    }
  }
}
