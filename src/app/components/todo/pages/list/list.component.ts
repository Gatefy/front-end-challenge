import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material";
import {
  ConfirmDialogModel,
  ConfirmDialogComponent
} from "../../../confirm-dialog/confirm-dialog.component";

import { IconService } from "@ant-design/icons-angular";
import {
  PlusOutline,
  EditOutline,
  DeleteOutline,
  FilterOutline,
  EllipsisOutline,
  HistoryOutline,
  CheckOutline,
  FileTextOutline,
  CloseCircleOutline,
  RestOutline
} from "@ant-design/icons-angular/icons";

import { Todo } from "../../interfaces/todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  totalTask: number = 0;
  tasks: Todo[];
  result = "";
  filter: string = "all";

  constructor(
    private todoService: TodoService,
    private _iconService: IconService,
    public dialog: MatDialog
  ) {
    this._iconService.addIcon(
      ...[
        PlusOutline,
        EditOutline,
        DeleteOutline,
        FilterOutline,
        EllipsisOutline,
        HistoryOutline,
        CheckOutline,
        FileTextOutline,
        CloseCircleOutline,
        RestOutline
      ]
    );
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): Todo[] {
    this.tasks = this.todoService.loadAll();
    return this.tasks;
  }

  handleFilter(filter) {
    this.tasks = this.todoService.loadByFilter(filter);
    return this.tasks;
  }

  handleStatus(task): void {
    const { id } = task;
    this.todoService.updateStatus(id);
    this.tasks = this.todoService.loadAll();
  }

  handleDelete(task): void {
    this.todoService.delTask(task);
    this.tasks = this.todoService.loadAll();
  }

  handleConfirm($event: any, task): void {
    $event.preventDefault();

    const title = "Atenção";
    const message = "Você realmente deseja excutar esta ação?";

    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.handleDelete(task);
      }
    });
  }
}
